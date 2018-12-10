class Api::VcfFilesController < Api::BaseController
  before_action :authenticate_token

  # POST /vcf_files
  # saves the uploaded vcf file in the /data/received_vcffiles folder
  def create
    # validate file extension and that the file belongs to the correponding case_id
    if not validate_filename
      msg = { msg: MSG_VCF_INVALID }
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
      msg = { msg: MSG_VCF_NO_CASE }
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
      vcf_full_path = File.join(dirname, fname)
      vcf = UploadedVcfFile.create(patient_id: p.id,
                                   file_name: fname,
                                   user_id: user.id,
                                   full_path: vcf_full_path)
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
      p_status = p_service.pedia_status
      if p_status.running?
        msg = { msg: MSG_PEDIA_RUNNING_TRY_LATER }
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
                                  uploaded_vcf_file_id: vcf.id,
                                  patient_id: p.id,
                                  pedia_status_id: status.id)
    # Create pedia service folder
    service_folder = File.join('Data/PEDIA_service/', case_id.to_s, service.id.to_s)
    FileUtils.mkdir_p service_folder

    job = Delayed::Job.enqueue(service)
    service.job_id = job.id
    service.save
    respond_to do |format|
      msg = { msg: MSG_VCF_SUCCESS_PEDIA_RUNNING }
      format.json { render plain: msg.to_json,
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
        msg = { msg: MSG_VCF_DELETED }
        format.json { render plain: msg.to_json,
                      status: 200,
                      content_type: 'application/json'
                    }
      end
    else
      respond_to do |format|
        msg = { msg: MSG_VCF_NOT_EXIST }
        format.json { render plain: msg.to_json,
                      status: 400,
                      content_type: 'application/json'
                    }
      end
    end
  end

  def authenticate_token
    api_token, options = ActionController::HttpAuthentication::Token.token_and_options(request)
    token = ApiKey.where(access_token: api_token).first
    if token
      if token.expired?
        respond_to do |format|
          msg = { msg: MSG_TOKEN_EXPIRED }
          format.json { render plain: msg.to_json,
                        status: 401,
                        content_type: 'application/json'
                      }
        end
      end
    else
      respond_to do |format|
        msg = { msg: MSG_TOKEN_INVALID }
        format.json { render plain: msg.to_json,
                      status: 401,
                      content_type: 'application/json'
                    }
      end
    end
  end
end
