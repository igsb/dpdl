class PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :edit, :update, :destroy]

  # GET /patients
  # GET /patients.json
  def index
    @patients = Patient.page(params[:page]).per(10)
  end

  # GET /patients/1
  # GET /patients/1.json
  def show
    @diagnosed_disorders = @patient.get_selected_disorders 
    @detected_disorders = @patient.get_detected_disorders 
    @gene = @patient.pedia.limit(10).order("pedia_score DESC") 
    @causing_muts = @patient.disease_causing_mutations
    result_link = @patient.result_figures.take
    if !result_link.nil?
      @result_link = result_link.link.split('/')[-1]
    end
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
      submitter = Submitter.find_or_create_by(name:data['submitter']['user_name'], email:data['submitter']['user_email'], team:data['submitter']['team'])
      @patient = Patient.create(case_id: data['case_id'], age: data['age'], submitter: submitter, last_name:data['last_name'], first_name:data['first_name'])
      if @patient.valid?
        @patient.parse_json(data)
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

    #end
  end

  # PATCH/PUT /patients/1
  # PATCH/PUT /patients/1.json
  def update
    usi = UsiMaterialnr.find_or_create_by(patient_id:@patient.id)
    usi.usi_id = usi_params[:usi_id]
    usi.materialnr = usi_params[:materialnr]
    usi.save
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

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_patient
    @patient = Patient.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def patient_params
    params.require(:patient).permit(:patient_id, :age, :submitter_id, :publication_id)
  end

  def usi_params
    params.require(:patient).permit(:usi_id, :materialnr)
  end
end
