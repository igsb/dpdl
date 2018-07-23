class Api::PatientsController < Api::BaseController
  before_action :authenticate_token
  before_action :create_zip, only: [:get_results]

  # POST /patients
  # read the request body, parse the json and create a new patient record
  def create
    content = JSON.parse request.body.read

    patient_id = content['f2g_case_id']
    sample_id = content['sample_id']
    user = content['case_data']['posting_user']
    user_name = user['userDisplayName']
    user_email = user['userEmail']
    user_institute = user['userInstitution']
    user_team = nil
    features = content['case_data']['selected_features']
    hpo_array = []
    features.each do |feature|
      hpo_array << feature['feature']['hpo_full_id']
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
    submitter = Submitter.find_or_create_by(first_name: first_name, last_name: last_name, email:user_email, team: user_team, title: title)
    patient = Patient.create(case_id: patient_id, submitter: submitter, last_name:content['patient_last_name'], first_name:content['patient_first_name'])
    feature_array = []
    for hpo in hpo_array do
      hpo_result = Feature.find_or_create_by(hpo_term: hpo)
      feature_array.push(hpo_result)
    end
    
    patient.features << feature_array
    patient.save
    user = User.find_by_email(submitter.email)

    if not user.nil?
      if not user.patients.exists?(patient.id)
        user.patients << patient
      end
    end

    respond_to do |format|
      if patient.save
        format.json { render plain: {msg:'DPDL case created successfully'}.to_json, status: 200, content_type: 'application/json'}
      else
        format.json { render plain: {error:'Unable to save patient information.Please check the data'}.to_json, status: 400, content_type: 'application/json'}
      end
    end          

  end

  #post /get_results
  #get the results, for the specified case id and send it as a response
  def get_results
    send_file( 'Data/tmp/' + params[:case_id]+'.zip',
              :disposition => 'inline',
              :type => 'application/zip',
              :xsend_file => true )
  
  end
  
  def create_zip
    case_id = params[:case_id]
    zip_file_name = 'Data/tmp/' + case_id + '.zip'

    Zip::File.open(zip_file_name, Zip::File::CREATE) do |zip|
      zip.add('manhattan_' + case_id + '.png', File.join('Data/images/','manhattan_' + case_id + '.png',))
      zip.add(case_id + '.csv', File.join('Data/PEDIA_service/',case_id + '.csv',))
    end
  end
  
  def authenticate_token
    token = ApiKey.where(access_token: params[:token]).first
    if token && !token.expired?

    else
      if token.expired?
        token.destroy
        respond_to do |format|
          format.json { render plain: {error:'Token expired.'}.to_json, status: 401, content_type: 'application/json'}
        end
      else
        respond_to do |format|
          format.json { render plain: {error:'Invalid token.'}.to_json, status: 401, content_type: 'application/json'}
        end
      end
    end
  end
end

