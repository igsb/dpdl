class Api::VcfFilesController < Api::BaseController
  before_action :authenticate_token

  # POST /vcf_files
  # saves the uploaded vcf file in the /data/received_vcffiles folder
  def create
    # validate file extension and that the file belongs to the correponding case_id
    if not validate_filename
      msg = { msg: 'Invalid file' }
      respond_to do |format|
        format.json { render plain: msg.to_json,
                      status: 400,
                      content_type: 'application/json'
                    }
      end
      return
    end

    fname = File.basename(params[:file].original_filename)
    case_id = params[:case_id]

    # check if the corresponding case is alredy created
    p = Patient.find_by_case_id(case_id)
    if p.nil?
      msg = { msg: 'Corresponding case does not exist. Please create the case first' }
      respond_to do |format|
        format.json { render plain: msg.to_json,
                      status: 400,
                      content_type: 'application/json'
                    }
      end
      return
    end

    # Data/Received_VcfFiles/case_id/
    dirname = File.join('Data', 'Received_VcfFiles', case_id.to_s)
    dir = "#{Rails.root}/#{dirname}"
    FileUtils.mkdir(dir) unless File.directory?(dir)
    json_path = File.join('Data', 'Received_JsonFiles', case_id.to_s + '.json')

    # Check if VCF file header hg19
    f = "#{dir}/#{fname}"
    vcf = UploadedVcfFile.find_by(patient_id: p.id, file_name: fname)
    if vcf.nil?
      FileUtils.cp_r(params[:file].tempfile.path, f)
      user = User.find_by_username('admin')
      vcf = UploadedVcfFile.create(patient_id: p.id,
                                   file_name: fname,
                                   user_id: user.id)
    else
      # check if VCF file is different from the original one
      unless FileUtils.compare_file(f, params[:file].tempfile.path)
        vcf.updated_at = Time.now.to_datetime
        FileUtils.cp_r(params[:file].tempfile.path, f)
      end
    end
    vcf.save
    add_vcf_to_json(json_path, f)
    user = User.find_by(username: 'FDNA')
    # Check if PEDIA service is already running
    p_services = p.pedia_services
    unless p_services.empty?
      p_service = p_services.last
      p_status = p_service.pedia_status.status
      if p_status.running?
        msg = { msg: 'There is another PEDIA service for this case running. Please try it later.' }
        respond_to do |format|
          format.json { render plain: msg.to_json,
                        status: 400,
                        content_type: 'application/json'
                      }
        end
        return
      end
    end
    status = PediaStatus.find_by(status: PediaStatus::INIT)
    service = PediaService.create(user_id: user.id,
                                  json_file: json_path,
                                  vcf_file: f,
                                  patient_id: p.id,
                                  pedia_status_id: status.id)
    job = Delayed::Job.enqueue(service)
    respond_to do |format|
      format.json { render plain: { msg: 'VCF file uploaded successfully. PEDIA workflow will be triggered' }.to_json,
                    status: 200,
                    content_type: 'application/json'
                  }
    end
  end

  def add_vcf_to_json(json_path, vcf_name)
    content = JSON.parse(File.read(json_path))
    content['documents'] = [{ document_name: vcf_name,
                              is_vcf: 1 }]
    File.open(json_path, 'w') do |f|
      f.puts JSON.pretty_generate(content)
    end
  end

  def validate_filename
    valid = true
    fname = File.basename(params[:file].original_filename)
    if !(fname =~ /zip$/ || fname =~ /gz$/ || fname =~ /vcf$/)
      valid = false
    end

    return valid
  end

  # DELETE /vcf_files/id
  def destroy
    case_id = params[:id]
    p = Patient.find_by_case_id(case_id)
    vcf = UploadedVcfFile.find_by(patient_id: p.id)
    if !vcf.nil?
      vcf.destroy
      path_vcf_file = "#{Rails.root}/Data/Received_VcfFiles/#{case_id}/#{vcf.file_name}"
      File.delete(path_vcf_file) if File.exist?(path_vcf_file)
      respond_to do |format|
        format.json { render plain: { msg: 'Vcf file deleted' }.to_json,
                      status: 200,
                      content_type: 'application/json'
                    }
      end
    else
      respond_to do |format|
        format.json { render plain: { msg: 'File does not exist' }.to_json,
                      status: 400,
                      content_type: 'application/json'
                    }
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
          format.json { render plain: { error: 'Token expired' }.to_json,
                        status: 401,
                        content_type: 'application/json'
                      }
        end
      else
        respond_to do |format|
          format.json { render plain: { error: 'Invalid token' }.to_json,
                        status: 401,
                        content_type: 'application/json'
                      }
        end
      end
    end
  end
end
