class Api::PatientsController < Api::BaseController
  before_action :authenticate_token
  before_action :create_json, only: [:get_results]

  require 'csv'

  # POST /patients
  # read the request body, parse the json and create a new patient record
  def create
    content = JSON.parse request.body.read
    patient_id = content['case_data']['case_id']

    # first check if a case already exists, if so do not continue processing
    p = Patient.find_by_case_id(patient_id)
    if !p.nil?
      respond_to do |format|
        format.json { render plain: { msg: 'DPDL case already exists' }.to_json,
                      status: 400,
                      content_type: 'application/json'
                    }
      end
      return
    end

    # if a case doesnt exist, process the request and create a new case
    if content['case_data'].has_key? 'posting_user'
      user = content['case_data']['posting_user']
      user_name = user['userDisplayName']
      user_email = user['userEmail']
      user_institute = user['userInstitution']
      user_team = nil
    else
      user_name = "Ms. FDNA"
      user_email = "fdna@bla.com"
      user_institute = "F2G"
      user_team = nil
    end

    user_array = user_name.split('.', 2)
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

    submitter = Submitter.find_or_create_by(first_name: first_name, last_name: last_name, email: user_email, team: user_team, title: title)
    patient = Patient.create(case_id: patient_id, submitter: submitter)

    # Parse Features
    if content['case_data'].has_key? 'selected_features'
      features = content['case_data']['selected_features']
      hpo_array = []
      features.each do |feature|
        hpo_array << feature['feature']['hpo_full_id']
      end

      feature_array = []
      for hpo in hpo_array do
        hpo_result = Feature.find_or_create_by(hpo_term: hpo)
        feature_array.push(hpo_result)
      end
      patient.features << feature_array
      patient.save
    end

    # ToDo: Parse suggested syndrome

    user = User.find_by_email(submitter.email)
    if not user.nil?
      if not user.patients.exists?(patient.id)
        user.patients << patient
      end
    end

    dirname = File.join("Data", "Received_JsonFiles")
    dir = "#{Rails.root}/#{dirname}"
    FileUtils.mkdir(dir) unless File.directory?(dir)

    f = "#{dir}/#{patient_id}.json"
    File.open(f, "wb") { |f| f.write(JSON.pretty_generate(content)) }

    respond_to do |format|
      if patient.save
        format.json { render plain: { msg: 'DPDL case created successfully' }.to_json,
                      status: 200,
                      content_type: 'application/json'
                    }
      else
        format.json { render plain: { error: 'Unable to save patient information. Please check the data'}.to_json,
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
    data = File.read('Data/tmp/' + case_id + '.json')
    send_data(data,
              disposition: 'inline',
              type: 'application/json')

    File.delete('Data/tmp/' + params[:case_id] + '.json')
  end

  def create_json
    case_id = params[:case_id]

    result_file_name = (File.join('Data/PEDIA_service/', case_id, case_id + '.csv', ))
    json_file_name = (File.join('Data/tmp/', case_id + '.json', ))

    # first check if the case exists, if not do not continue processing
    # Check the status of the pedia results
    patient = Patient.find_by_case_id(case_id)
    unless patient.nil?
      services = patient.pedia_services
      if services.empty?
        msg = { msg: 'No PEDIA service found' }
        status = 400
      else
        service = services.last
        if service.pedia_status.status.include? 'failed'
          msg = { msg: service.pedia_status.status }
          status = 500
        elsif service.pedia_status.status.include? 'running' or
              service.pedia_status.status.include? 'Initiate'
          msg = { msg: service.pedia_status.status }
          status = 404
        elsif service.pedia_status.status.include? 'Complete'
          unless File.exist?(result_file_name)
            msg = { msg: 'Can not find results' }
            status = 500
          end
        end
      end
    else
      msg = { msg: 'Case does not exist. Please create a case first to get PEDIA results' }
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
    p = Patient.find_by_case_id(case_id)
    if p.nil?
      respond_to do |format|
        format.json { render plain: { msg: 'case does not exist' }.to_json,
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
        format.json { render plain: { msg: 'Patient information deleted' }.to_json,
                      status: 200,
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
