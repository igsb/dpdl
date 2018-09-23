class PediaServicesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]
  before_action :set_pedia_service, only: [:show, :edit, :update, :destroy]
  before_action :check_access, only: [:show, :edit, :update, :destroy]
  require 'fileutils'

  # GET /pedia_services
  # GET /pedia_services.json
  def index
    @pedia_services = PediaService.all.order('job_id DESC')
  end

  def monitor
    @pedia_services = PediaService.all.order('job_id DESC')
  end

  def download
  end

  def download_file
    filename = "pedia_jsons_v1.tar.gz"
    Download.create(filename: filename, user_id: current_user.id)
    send_file(
      "#{Rails.root}/public/" + filename,
      filename: filename,
      type: "application/x-compressed"
    )
  end

  # GET /pedia_services/1
  # GET /pedia_services/1.json
  def show
  end

  # GET /pedia_services/new
  def new
    @pedia_service = PediaService.new
  end

  # GET /pedia_services/1/edit
  def edit
  end

  # POST /pedia_services
  # POST /pedia_services.json
  def create
    @pedia_service = PediaService.new
    json_file = params[:json_file].read
    name = params[:json_file].original_filename
    if File.extname(name) != ".json"
      flash[:alert] = "It is not a JSON file. Please select a JSON file."
      render :action => :new
      return
    end
    data = JSON.parse(json_file)
    if not data.has_key?("case_id")
      flash[:alert] = "There is no CASE ID in your JSON file! Please check if you have the correct format."
      render :action => :new
      return
    end
    patient_id = data['case_id']
    dir_path = File.join("Data", "PEDIA_service", patient_id)
    unless File.directory?(dir_path)
      FileUtils.mkdir_p(dir_path)
    end
    json_path = File.join(dir_path, patient_id + '.json')
    File.open(json_path, "wb") { |f| f.write(json_file) }
    vcf_file = params[:vcf].read
    name = params[:vcf].original_filename
    vcf_path = File.join(dir_path, name)
    File.open(vcf_path, "wb") { |f| f.write(vcf_file) }

    email = params[:email]
    user = params[:username]
    puts email
    @pedia_service.email = email
    @pedia_service.username = user
    @pedia_service.json_file = json_path
    @pedia_service.vcf_file = vcf_path
    respond_to do |format|
      if @pedia_service.save
        format.html { redirect_to action: "index" and flash[:notice] = 'Pedia service was successfully submitted.' }
        format.json { render :index, status: :created, location: @pedia_service }
      else
        format.html { render :new }
        format.json { render json: @pedia_service.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pedia_services/1
  # PATCH/PUT /pedia_services/1.json
  def update
    respond_to do |format|
      if @pedia_service.update(pedia_service_params)
        format.html { redirect_to @pedia_service, notice: 'Pedia service was successfully updated.' }
        format.json { render :show, status: :ok, location: @pedia_service }
      else
        format.html { render :edit }
        format.json { render json: @pedia_service.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pedia_services/1
  # DELETE /pedia_services/1.json
  def destroy
    @pedia_service.destroy
    respond_to do |format|
      format.html { redirect_to pedia_services_url, notice: 'Pedia service was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_pedia_service
    @pedia_service = PediaService.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def pedia_service_params
    params.fetch(:pedia_service, {})
  end

  def check_access
    access = current_user.username == 'FDNA' || current_user.admin
    if not access
      flash[:alert] = 'You do not have permissions to enter this case!'
      redirect_back(fallback_location: root_path)
    end
  end
end
