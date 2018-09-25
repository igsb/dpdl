require 'net/http'
require 'uri'
require 'json'
require 'mime/types'


namespace :patient do

  desc "Update case"
  task :update_case, [:filename] => :environment do |task, args|
    file = File.read(args.filename)
    content = JSON.parse(file)
    patient_id = content['case_id']
    hpo_array = content['features']

    patient = Patient.find_by_case_id(patient_id)
    for hpo in hpo_array do
      hpo_result = Feature.find_or_create_by(hpo_term: hpo)
      if not patient.features.exists?(hpo_result.id)
        patient.features << hpo_result
      end
    end

    syns = content['selected_syndromes']
    syns.each do |syn|
      diagnosis = syn['diagnosis']
      if syn['omim_id'].nil?
        puts "Syndrome has no omim: #{syn['syndrome_name']}"
      else
        if syn['omim_id'].kind_of?(Array)
          disorder = Disorder.find_by(disorder_name: syn['syndrome_name'],
                                      is_phenotypic_series: true)
          if disorder.nil?
            puts "Syndrome has no PS: #{syn['syndrome_name']}"
            disorder = Disorder.create(omim_id: syn['omim_id'][0],
                                       disorder_name: syn['syndrome_name'],
                                       is_phenotypic_series: true)
            patient_disorder = PatientsDisorder.find_or_create_by(patient_id: patient.id,
                                                                  disorder_id: disorder.id)
            patient_disorder.diagnosis_type_id = DiagnosisType.diag_type(diagnosis)
            patient_disorder.save
          else
            patient_disorder = PatientsDisorder.find_or_create_by(patient_id: patient.id,
                                                                  disorder_id: disorder.id)
            patient_disorder.diagnosis_type_id = DiagnosisType.diag_type(diagnosis)
            patient_disorder.save
          end
        else
          disorder = Disorder.find_by(omim_id: syn['omim_id'],
                                      is_phenotypic_series: false)
          patient_disorder = PatientsDisorder.find_or_create_by(patient_id: patient.id,
                                                                disorder_id: disorder.id)
          patient_disorder.diagnosis_type_id = DiagnosisType.diag_type(diagnosis)
          patient_disorder.save
        end
      end
    end

    patient.save
    #user = User.find_by_email(submitter.email)

    #if not user.nil?
    #  if not user.patients.exists?(patient.id)
    #    user.patients << patient
    #  end
    #end
  end

  desc "Add lab case"
  task :update_lab_case, [:lab, :case_id]  => :environment do |task, args|
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
      patient_id = content['f2g_case_id']
      filename = 'lab_jsons/' + patient_id.to_s + '.json'
      File.open(filename, 'w') do |f|
        f.puts JSON.pretty_generate(content)
      end
      features = content['case_data']['selected_features']
      hpo_array = []
      features.each do |feature|
        hpo_array << feature['feature']['hpo_full_id']
      end

      patient = Patient.find_by_case_id(patient_id)
      for hpo in hpo_array do
        hpo_result = Feature.find_or_create_by(hpo_term: hpo)
        if not patient.features.exists?(hpo_result.id)
          patient.features << hpo_result
        end
      end

      syns = content['case_data']['selected_syndromes']
      syns.each do |selected_syn|
        syn = selected_syn['syndrome']
        diagnosis = selected_syn['diagnosis']
        if syn['omim_id'].nil? and syn['omim_ids'].nil?
          puts "Syndrome has no omim: #{syn['syndrome_name']}"
        else
          unless syn['omim_ps_id'].nil?
            ps_id = syn['omim_ps_id'].split('PS')[1]
            disorder = Disorder.find_by(omim_id: ps_id,
                                        is_phenotypic_series: true)
            if disorder.nil?
              puts "Syndrome has no PS: #{syn['syndrome_name']}"
              disorder = Disorder.find_by(omim_id: ps_id,
                                          disorder_name: syn['syndrome_name'],
                                          is_phenotypic_series: true)
              patient_disorder = PatientsDisorder.find_or_create_by(patient_id: patient.id,
                                                                    disorder_id: disorder.id)
              patient_disorder.diagnosis_type_id = DiagnosisType.diag_type(diagnosis)
              patient_disorder.save
            else
              patient_disorder = PatientsDisorder.find_or_create_by(patient_id: patient.id,
                                                                    disorder_id: disorder.id)
              patient_disorder.diagnosis_type_id = DiagnosisType.diag_type(diagnosis)
              patient_disorder.save
            end
          else
            disorder = Disorder.find_by(omim_id: syn['omim_id'],
                                        is_phenotypic_series: false)
            patient_disorder = PatientsDisorder.find_or_create_by(patient_id: patient.id,
                                                                  disorder_id: disorder.id)
            patient_disorder.diagnosis_type_id = DiagnosisType.diag_type(diagnosis)
            patient_disorder.save
          end
        end
      end
      patient.save
    end
  end
end
