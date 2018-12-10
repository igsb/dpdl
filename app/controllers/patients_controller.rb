class PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :edit, :update, :destroy]
  before_action :check_access, only: [:show, :edit, :update, :destroy]
  before_action :check_read_only, only: [:edit, :update, :destroy]
  before_action :check_demo, only: [:index, :show, :edit, :update, :destroy]

  # GET /patients
  # GET /patients.json
  def index
    user = current_user
    sub_ids = []
    if not current_user.admin
      if params[:result] == "true"
        @patients = user.patients.where(result: true).order(:case_id).page(params[:page]).per(25)
      else
        @patients = user.patients.order(:case_id).page(params[:page]).per(25)
      end
    else
      if params[:result] == "true"
        @patients = Patient.where(result: true).order(:case_id).page(params[:page]).per(25)
      else
        @patients = Patient.order(:case_id).page(params[:page]).per(25)
      end
    end
  end

  # GET /patients/1
  # GET /patients/1.json
  def show
    @diagnosed_disorders = @patient.get_selected_disorders
    @detected_disorders = @patient.get_detected_disorders
    #@gene = @patient.pedia.order("pedia_score DESC")
    pedia_service = @patient.pedia_services.last
    if pedia_service.nil?
      @gene = @patient.pedia.order("pedia_score DESC")
      if @gene.count > 0
        gon.results = get_pedia_json(@gene)
      end
    else
      @gene = pedia_service.pedia.order("pedia_score DESC")
      gon.results = get_pedia_json(@gene)
    end
    @causing_muts = @patient.disease_causing_mutations
  end

  def get_pedia_json(results)
    pedia = []
    results.each do |result|
      gene = result.gene
      label = result.label
      if label.nil?
        label = 0
      end
      tmp = {entrez_id: gene.entrez_id,
             pedia_score: result.pedia_score,
             gene_symbol: gene.name,
             label: label,
             pos: gene.pos,
             chr: gene.chr
            }
      pedia.push(tmp)
    end
    return pedia
  end

  def get_img
    send_file( 'Data/images/' + params[:filename],
              :disposition => 'inline',
              :type => 'image/jpeg',
              :xsend_file => true )
  end

  # GET /patients/new
  def new
    @patient = Patient.new
  end

  # GET /patients/1/edit
  def edit
  end

  # POST /patients
  # POST /patients.json
  def create

    file = params[:file].read
    data = JSON.parse(file)
    ActiveRecord::Base.transaction do
      sub_user = data['submitter']['user_name']
      user_array = sub_user.split('.', 2)
      title = ''
      name = ''
      if user_array.length > 1
        title = user_array[0] + '.'
        name = user_array[1][1..-1]
        name_array = name.split(' ')
        first_name = name_array[0]
        last_name = name_array[-1]
        if name_array.length > 2
          first_name = name_array[0..-2].join(' ')
        end
      else
        name = user_array[0]
        name_array = name.split(' ')
        first_name = name_array[0]
        last_name = name_array[-1]
        if name_array.length > 2
          first_name = name_array[0..-2].join(' ')
        end
      end

      submitter = Submitter.find_or_create_by(first_name: first_name, last_name: last_name, email:data['submitter']['user_email'], team:data['submitter']['team'], title: title)
      @patient = Patient.create(case_id: data['case_id'], age: data['age'], submitter: submitter, last_name:data['last_name'], first_name:data['first_name'])
      user = User.find_by_email(submitter.email)
      if not user.nil?
        if not user.patients.exists?(@patient.id)
          user.patients << @patient
        end
      end
      if @patient.valid?
        @patient.parse_json(data)
        name = params[:file].original_filename
        path = File.join("Data", "jsons", name)
        File.open(path, "wb") { |f| f.write(file) }
      end
    end

    respond_to do |format|
      if @patient.save
        format.html { redirect_to @patient, notice: 'Patient was successfully created.' }
        format.json { render :show, status: :created, location: @patient }
      else
        format.html { render :new }
        format.json { render json: @patient.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /patients/1
  # PATCH/PUT /patients/1.json
  def update
    if params[:file]
      dirname = File.join('Data', 'Received_VcfFiles', @patient.case_id.to_s)
      dir = "#{Rails.root}/#{dirname}"
      FileUtils.mkdir(dir) unless File.directory?(dir)
      fname = params[:file].original_filename
      f = "#{dir}/#{fname}"
      vcf = UploadedVcfFile.find_by(patient_id: @patient.id, file_name: fname)
      if vcf.nil?
        FileUtils.cp_r(params[:file].tempfile.path, f)
        vcf = UploadedVcfFile.create(patient_id: @patient.id, file_name: fname, user_id: current_user.id)
      else
        # check if VCF file is different from the original one
        unless FileUtils.compare_file(f, params[:file].tempfile.path)
          vcf.updated_at = Time.now.to_datetime
          FileUtils.cp_r(params[:file].tempfile.path, f)
        end
      end
      vcf.save
    end
    if usi_params
      usi = UsiMaterialnr.find_or_create_by(patient_id: @patient.id)
      usi.usi_id = usi_params[:usi_id]
      usi.materialnr = usi_params[:materialnr]
      usi.save
    end
    respond_to do |format|
      if @patient.update(patient_params)
        format.html { redirect_to @patient, notice: 'Patient was successfully updated.' }
        format.json { render :show, status: :ok, location: @patient }
      else
        format.html { render :edit }
        format.json { render json: @patient.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /patients/1
  # DELETE /patients/1.json
  def destroy
    @patient.destroy
    respond_to do |format|
      format.html { redirect_to patients_url, notice: 'Patient was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def download_vcf
    name = File.basename(params[:name])
    ext = File.extname(params[:name])
    send_file(
      File.join("#{Rails.root}/", params[:name]),
      filename: name,
      type: "application/" + ext
    )
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_patient
    @patient = Patient.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def patient_params
    params.require(:patient).permit(:patient_id, :age, :submitter_id, :publication_id, :first_name, :last_name)
  end

  def usi_params
    params.require(:patient).permit(:usi_id, :materialnr)
  end

  def check_access
    access = false
    if not current_user.admin
      user = current_user
      if user.patients.exists?(@patient.id)
        access = true
      end
    else
      access = true
    end
    if not access
      flash[:alert] = 'You do not have permissions to enter this case!'
      redirect_back(fallback_location: root_path)
    end
  end
  def check_read_only
    if current_user.username == "demo"
      flash[:alert] = 'You do not have permissions to modify this case!'
      redirect_back(fallback_location: root_path)
    end
  end
  def check_demo
    @demo = false
    if current_user.username == "demo"
      @demo = true
    end
  end
end
