class Api::PatientsController < Api::BaseController
  before_action :authenticate_token

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
		format.json { render plain: {msg:'Patient was successfully created'}.to_json, status: 200, content_type: 'application/json'}
       
      else
        format.json { render plain: {error:'Unable to save patient information.Please check the data'}.to_json, status: 400, content_type: 'application/json'}
      end
    end          

    #end
  end

  
  # If update needs to be exposed for the API then use this
  # # PATCH/PUT /patients/1
  # def update
	# caseid = params [:case_id]
    # data = JSON.parse request.body.read
      
    # patient = Patient.find_by(case_id: caseid)
        # if patient.valid?
          # patient.update_json(data)  
        # end
     
    # if usi_params
      # usi = UsiMaterialnr.find_or_create_by(patient_id:@patient.id)
      # usi.usi_id = usi_params[:usi_id]
      # usi.materialnr = usi_params[:materialnr]
      # usi.save
    # end
    # respond_to do |format|
      # if patient.update(patient_params)
		# format.json { render plain: {msg:'Patient information was successfully updated'}.to_json, status: 200, content_type: 'application/json'}
       
      # else
        # format.json { render plain: {error:'Unable to update patient information.Please check the data'}.to_json, status: 400, content_type: 'application/json'}
      # end
    # end
  # end
  
  
  # def patient_params
    # params.require(:patient).permit(:patient_id, :age, :submitter_id, :publication_id, :first_name, :last_name)
  # end
  
  # def usi_params
    # params.require(:patient).permit(:usi_id, :materialnr)
  # end

  
  def authenticate_token
    token = ApiKey.where(access_token: params[:token]).first
    if token && !token.expired?
		
	else
		respond_to do |format|
			format.json { render plain: {error:'token invalid or expired.'}.to_json, status: 401, content_type: 'application/json'}
		end
	end
  end
end