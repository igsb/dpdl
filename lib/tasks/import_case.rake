require 'net/http'
require 'uri'
require 'json'
require 'mime/types'

namespace :lab do
  desc "Add lab case"
  task :get_case, [:lab, :case_id]  => :environment do |task, args|
    puts "Lab: " +  args.lab + ", Case Lab ID: " + args.case_id
    if args.lab == 'bonn'
      lab_id = '8'
      lab_name = 'bonn'
      api_key = ENV["BONN_KEY"]
      api_secret = ENV["BONN_SECRET"]
    elsif lab == 'pedia'
      lab_id = '26'
      lab_name =  "PEDIA"
      api_key = ENV["PEDIA_KEY"]
      api_secret = ENV["PEDIA_SECRET"]
    end

    connect_uri = URI.parse("https://app.face2gene.com/api/labs/auth/connect")
    lab_get_case_list = "https://app.face2gene.com/api/lab-cases?lab_id=" + lab_id
    case_uri = URI.parse("https://app.face2gene.com/api/lab-cases/" + args.case_id)
    http = Net::HTTP.new(connect_uri.host, connect_uri.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(connect_uri.path, {"Content-Type" => "application/json", "Accept" => "application/json"})
    data = { "api_key" => api_key, "secret" => api_secret }.to_json
    request.body = data
    response = http.request(request)
    puts response.code
    token = ""
    if response.code == '200'
      token = JSON.parse(response.body)['jwt']
      auth = "Bearer " + token
      http = Net::HTTP.new(case_uri.host, case_uri.port)
      http.use_ssl = true
      req = Net::HTTP::Get.new(case_uri.path, {"Accept" => "application/json", "Authorization" => auth})
      res = http.request(req)
      content = JSON.parse(res.body)
      puts content
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

    end
  end

end
