class Api::PatientsController < Api::BaseController
  before_action :authenticate_token
  before_action :create_json, only: [:get_results]

  require 'csv'

  # POST /patients
  # read the request body, parse the json and create a new patient record
  def create
    original_content = JSON.parse request.body.read
    if original_content.key? ('source') and (original_content['source'] == 'GeneTalk' or original_content['source'] == 'Phenobot')
      content = JSON.parse Patient.convert(original_content)
    else
      content = original_content
    end
    patient_id = content['case_data']['case_id']
    time = Time.now.strftime('%d_%m_%Y_%H_%M_%S')
    log_dir = File.join(API_LOG, patient_id.to_s)
    unless File.directory?(log_dir)
      FileUtils.mkdir_p(log_dir)
    end
    log_path = File.join(log_dir, time + '.log')
    logger = Logger.new(log_path)
    logger.info 'Receive patient data'

    # Log the raw JSON data
    original_f = File.join(log_dir, time + '.json')
    File.open(original_f, "wb") { |f| f.write(JSON.pretty_generate(original_content)) }

    # if a case doesnt exist, process the request and create a new case
    patient_save = true
    msg = {}
    begin
      ActiveRecord::Base.transaction do
        consumer_id = get_consumer_id()
        lab = Patient.parse_lab(content, consumer_id)
        patient = Patient.find_by(case_id: patient_id, lab_id: lab.id)
        if patient.nil?
          patient = Patient.create_patient(content, consumer_id)
          msg = { msg: MSG_CASE_CREATED }
        else
          # Check if there is pedia service running to avoid
          # overwriting the data
          p_services = patient.pedia_services
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

          # Update patient data
          patient.update_json(content['case_data'])
          msg = { msg: MSG_CASE_UPDATE }
        end

        dirname = File.join("Data", "Received_JsonFiles", lab.id.to_s)
        dir = "#{Rails.root}/#{dirname}"
        FileUtils.mkdir(dir) unless File.directory?(dir)

        f = "#{dir}/#{patient_id}.json"
        File.open(f, "wb") { |f| f.write(JSON.pretty_generate(content)) }
      end
    rescue Exception => e
      logger = Logger.new(log_path)
      logger.error e.message
      e.backtrace.each { |line| logger.error line }
      patient_save = false
      msg = { msg: MSG_CASE_ERROR }
    end

    respond_to do |format|
      if patient_save
        format.json { render plain: msg.to_json,
                      status: 200,
                      content_type: 'application/json'
                    }
      else
        msg = { msg: MSG_CASE_ERROR }
        format.json { render plain: msg.to_json,
                      status: 400,
                      content_type: 'application/json'
                    }
      end
    end
  end

  #get /get_results
  #get the results, for the specified case id and send it as a response
  def get_results
    case_id = params[:case_id]
    lab_f2g_id = params[:lab_id]
    consumer_id = get_consumer_id()
    lab = Lab.find_by(lab_f2g_id: lab_f2g_id, api_consumer_id: consumer_id)
    lab_id = lab.id.to_s
    tmp_file = File.join('Data/tmp/', lab_id, case_id + '.json')
    data = File.read(tmp_file)
    send_data(data,
              disposition: 'inline',
              type: 'application/json')

    File.delete(tmp_file)
  end

  def create_json
    case_id = params[:case_id]
    lab_f2g_id = params[:lab_id]
    consumer_id = get_consumer_id()
    lab = Lab.find_by(lab_f2g_id: lab_f2g_id, api_consumer_id: consumer_id)
    if lab.nil?
      msg = { msg: MSG_NO_PEDIA_CASE }
      status = 400
      respond_to do |format|
        format.json { render plain: msg.to_json,
                      status: status,
                      content_type: 'application/json'
        }
      end
      return
    else
      lab_id = lab.id
    end
    lab_dir = File.join('Data/tmp/', lab_id.to_s)
    unless File.directory?(lab_dir)
      FileUtils.mkdir_p(lab_dir)
    end

    json_file_name = File.join(lab_dir, case_id + '.json')

    # first check if the case exists, if not do not continue processing
    # Check the status of the pedia results
    patient = Patient.find_by(case_id: case_id, lab_id: lab_id)
    if patient
      services = patient.pedia_services
      if services.empty?
        msg = { msg: MSG_NO_PEDIA }
        status = 400
      else
        service = services.last
        result_file_name = (File.join('Data/PEDIA_service/labs/', lab_id.to_s, case_id, service.id.to_s, case_id + '.csv'))
        unless File.exist?(result_file_name)
          if service.pedia_status.workflow_failed?
            msg = { msg: service.pedia_status.status }
            status = 500
          elsif service.pedia_status.workflow_running?
            msg = { msg: service.pedia_status.status }
            status = 404
          else
            msg = { msg: MSG_NO_PEDIA_RESULTS }
            status = 500
          end
        end
      end
    else
      msg = { msg: MSG_NO_PEDIA_CASE }
      status = 400
    end

    unless msg.nil?
      respond_to do |format|
        format.json { render plain: msg.to_json,
                      status: status,
                      content_type: 'application/json'
        }
      end
      return
    end
    result_file_name = (File.join('Data/PEDIA_service/labs', lab_id.to_s, case_id, service.id.to_s, case_id + '.csv'))
    lines = CSV.open(result_file_name).readlines
    keys = lines.delete lines.first

    File.open(json_file_name, "w") do |f|
      data = lines.map do |values|
        is_int(values) ? values.to_i : values.to_s
        Hash[keys.zip(values)]
      end
      f.puts JSON.pretty_generate(data)
    end
  end

  def is_int(str)
    # Check if a string should be an integer
    return !!(str =~ /^[-+]?[1-9]([0-9]*)?$/)
  end

  #DELETE /patients/id
  def destroy
    case_id = params[:id]
    lab_f2g_id = params[:lab_id]
    consumer_id = get_consumer_id()
    lab = Lab.find_by(lab_f2g_id: lab_f2g_id, api_consumer_id: consumer_id)
    lab_id = lab.id unless lab.nil?
    p = Patient.find_by(case_id: case_id, lab_id: lab_id)
    if p.nil?
      respond_to do |format|
        msg = { msg: MSG_CASE_NOT_EXISTS }
        format.json { render plain: msg.to_json,
                      status: 400,
                      content_type: 'application/json'
                    }
      end
      return
    else
      path_json_file = "#{Rails.root}/Data/Received_JsonFiles/#{case_id}.json"
      File.delete(path_json_file) if File.exist?(path_json_file)
      vcf = UploadedVcfFile.find_by(patient_id: p.id)
      p.destroy
      if !vcf.nil?
        path_vcf_file = "#{Rails.root}/Data/Received_VcfFiles/#{case_id}/#{vcf.file_name}"
        File.delete(path_vcf_file) if File.exist?(path_vcf_file)
        vcf.destroy
      end
      respond_to do |format|
        msg = { msg: MSG_CASE_DELETED }
        format.json { render plain: msg.to_json,
                      status: 200,
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
