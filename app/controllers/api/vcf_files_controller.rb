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
    lab_external_id = params[:lab_id]
    consumer_id = get_consumer_id()
    lab = Lab.find_by(lab_external_id: lab_external_id, api_consumer_id: consumer_id)
    lab_id = lab.id unless lab.nil?
    sample_index = params[:sample_index]
    if sample_index.nil? or (sample_index.to_i < 0)
      sample_index = 0
    else
      sample_index = sample_index.to_i
    end

    # check if the corresponding case is alredy created
    p = Patient.find_by(case_id: case_id, lab_id: lab_id)
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

    # Check if PEDIA service is already running
    p_services = p.pedia_services
    unless p_services.empty?
      p_service = p_services.last
      p_status = p_service.pedia_status
      if p_status.workflow_running?
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
    user = User.find_by_username('admin')
    status = PediaStatus.find_by(status: PediaStatus::INIT)
    service = PediaService.create(user_id: user.id,
                                  patient_id: p.id,
                                  pedia_status_id: status.id,
                                  vcf_sample_index: sample_index)

    # Data/Received_VcfFiles/case_id/
    dirname = File.join('Data', 'PEDIA_service/labs', lab_id.to_s, case_id.to_s, service.id.to_s)
    dir = "#{Rails.root}/#{dirname}"
    FileUtils.mkdir_p(dir) unless File.directory?(dir)


    # Check if VCF file header hg19
    f = "#{dir}/#{fname}"
    FileUtils.cp_r(params[:file].tempfile.path, f)
    vcf_full_path = File.join(dirname, fname)
    vcf = UploadedVcfFile.create(patient_id: p.id,
                                 file_name: fname,
                                 user_id: user.id,
                                 full_path: vcf_full_path)

    # Add vcf path to JSON file, then PEDIA pipeline is able to
    # find the VCF file
    # Copy JSON file to PEDIA service folder
    original_json_path = File.join('Data', 'Received_JsonFiles', lab_id.to_s, case_id.to_s + '.json')
    json_path = File.join(dir, case_id.to_s + '.json')
    add_vcf_to_json(original_json_path, f)
    FileUtils.cp_r(original_json_path, json_path)

    service.json_file = json_path
    service.uploaded_vcf_file_id = vcf.id
    service.save

    # enqueue PEDIA service
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

  # GET /get_QCreport
  def get_quality_report
    case_id = params[:case_id].to_i
    lab_external_id = params[:lab_id]
    consumer_id = get_consumer_id()
    lab = Lab.find_by(lab_external_id: lab_external_id, api_consumer_id: consumer_id)
    lab_id = lab.id unless lab.nil?
    patient = Patient.find_by(case_id: case_id, lab_id: lab_id)
    pdf_report = nil

    if patient.nil?
      msg = { msg: MSG_CASE_NOT_EXISTS }
    else
      service = patient.pedia_services.last
      if service.nil?
        msg = { msg: MSG_NO_PEDIA_CASE }
      else
        result = service.uploaded_vcf_file.quality_result
        pdf_report = service.uploaded_vcf_file.quality_report_path
        msg = if result == 'Passed'
                { msg: MSG_VCF_PASSED_QC }
              elsif pdf_report.nil? and result.nil?
                { msg: MSG_VCF_QC_RUNNING }
              elsif pdf_report.nil?
                { msg: MSG_VCF_TOO_SHORT }
              else
                { msg: MSG_VCF_FAILED_QC }
              end
      end
    end
    if pdf_report.nil?
      respond_to do |format|
        format.json { render plain: msg.to_json,
                      status: 400,
                      content_type: 'application/json'
        }
      end
    else
      puts File.basename(pdf_report)
      send_file(pdf_report,
                disposition: 'inline',
                type: 'application/pdf',
                filename: File.basename(pdf_report),
                xsend_file: true)
    end
  end

  # DELETE /vcf_files/id
  def destroy
    case_id = params[:id]
    lab_external_id = params[:lab_id]
    consumer_id = get_consumer_id()
    lab = Lab.find_by(lab_external_id: lab_external_id, api_consumer_id: consumer_id)
    lab_id = lab.id unless lab.nil?
    p = Patient.find_by(case_id: case_id, lab_id: lab_id)

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

  def get_consumer_id
    api_token, options = ActionController::HttpAuthentication::Token.token_and_options(request)
    token = ApiKey.where(access_token: api_token).first
    return token.api_consumer_id
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
