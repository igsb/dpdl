class Api::VcfFilesController < Api::BaseController
  before_action :authenticate_token

  # POST /vcf_files
  # saves the uploaded vcf file in the /data/received_vcffiles folder
  def create
    # validate file extension and that the file belongs to the correponding case_id
    if not validate_filename
      respond_to do |format|
        format.json { render plain: { msg: 'Invalid file' }.to_json, status: 400, content_type: 'application/json' }
      end
      return
    end

    fname = File.basename(params[:file].original_filename)
    case_id = params[:case_id]

    # check if the corresponding case is alredy created
    p = Patient.find_by_case_id(case_id)
    if p.nil?
      respond_to do |format|
        format.json { render plain: { msg: 'Corresponding case does not exist. Please create the case first' }.to_json,
                      status: 400, content_type: 'application/json' }
      end
      return
    end

    dirname = File.join("Data", "Received_VcfFiles")
    dir = "#{Rails.root}/#{dirname}"
    FileUtils.mkdir(dir) unless File.directory?(dir)

    f = "#{dir}/#{fname}"
    FileUtils.cp_r(params[:file].tempfile.path, f)
    vcf = UploadedVcfFile.find_by_file_name(fname)
    if vcf.nil?
      vcf = UploadedVcfFile.create(case_id: case_id, file_name: fname)
    else
      vcf.updated_at = Time.now.to_datetime
    end
    vcf.save
    json_path = File.join("Data", "Received_JsonFiles", case_id.to_s + '.json')
    service = PediaService.create(username: 'FDNA',
                                  email: 'lab@fdna.com',
                                  json_file: json_path,
                                  vcf_file: f,
                                  case_id: case_id)
    PediaServiceJob.perform_later(service)

    respond_to do |format|
      format.json { render plain: {msg: 'VCF file uploaded successfully. PEDIA workflow will be triggered' }.to_json,
                    status: 200, content_type: 'application/json' }
    end
  end

  def validate_filename
    valid = true
    fname = File.basename(params[:file].original_filename)
    case_id = fname.split('.')[0]
    caseid = params[:case_id]
    if case_id != caseid
      valid = false
    end
    if !(fname =~ /zip$/ || fname =~ /gz$/ || fname =~ /vcf$/)
      valid = false
    end

    return valid
  end

  # DELETE /vcf_files/id
  def destroy
    case_id = params[:id]
    vcf = UploadedVcfFile.find_by_case_id(case_id)
    if !vcf.nil?
      vcf.destroy
      path_vcf_file = "#{Rails.root}/Data/Received_VcfFiles/#{vcf.file_name}"
      File.delete(path_vcf_file) if File.exist?(path_vcf_file)
      respond_to do |format|
        format.json { render plain: {msg: 'Vcf file deleted' }.to_json,
                      status: 200, content_type: 'application/json' }
      end
    else
      respond_to do |format|
        format.json { render plain: {msg: 'File does not exist' }.to_json,
                      status: 400, content_type: 'application/json' }
      end
    end
  end

  def authenticate_token
    api_token, options = ActionController::HttpAuthentication::Token.token_and_options(request)
    token = ApiKey.where(access_token: api_token).first
    if token && !token.expired?

    else
      if token.expired?
        respond_to do |format|
          format.json { render plain: {error: 'Token expired' }.to_json, status: 401, content_type: 'application/json' }
        end
      else
        respond_to do |format|
          format.json { render plain: {error: 'Invalid token' }.to_json, status: 401, content_type: 'application/json' }
        end
      end
    end
  end
end
