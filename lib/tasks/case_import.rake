namespace :cases do
  desc "Import cases"
  task :default_cases => :environment do
    Dir["public/cases/*.json"].each do |filename|
      if Patient.where(case_id:filename.split('.')[0]).nil?
        puts filename.split('.')[0] + ' already existed'
      else
        puts 'import ' + filename
        file = open(filename).read
        data = JSON.parse(file)
        ActiveRecord::Base.transaction do
          submitter = Submitter.find_or_create_by(name:data['submitter']['user_name'], email:data['submitter']['user_email'], team:data['submitter']['team'])
          @patient = Patient.create(case_id: data['case_id'], age: data['age'], submitter: submitter, last_name:data['last_name'], first_name:data['first_name'])
          if @patient.valid?
            @patient.parse_json(data)
          end
        end
        puts 'import ' + filename + ' completed'
      end
    end
  end

  desc "Run import cases"
  task :all => [:default_cases]
  
end
