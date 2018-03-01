namespace :cases do
  desc "Import cases"
  task :import_folder => :environment do
    Dir["lib/tasks/Results_21022018/1KG_simulation/*.json"].each do |filename|
      if Patient.where(case_id:filename.split('.')[0]).nil?
        puts filename.split('.')[0] + ' already existed'
      else
        puts 'import ' + filename
        file = open(filename).read
        data = JSON.parse(file)
        ActiveRecord::Base.transaction do
          sub_user = data['submitter']['user_name']
          user_array = sub_user.split('.', 2)
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

          submitter = Submitter.find_or_create_by(first_name: first_name, last_name: last_name, email:data['submitter']['user_email'], team:data['submitter']['team'], title: title)
          @patient = Patient.create(case_id: data['case_id'], age: data['age'], submitter: submitter, last_name:data['last_name'], first_name:data['first_name'])
          user = User.find_by_email(submitter.email)
          if not user.nil?
            if not user.patients.exists?(@patient.id)
              user.patients << @patient
            end
          end

          if @patient.valid?
            @patient.parse_json(data)
            #name = params[:file].original_filename
            #path = File.join("Data", "jsons", name)
            #File.open(path, "wb") { |f| f.write(file) }
          end

          #submitter = Submitter.find_or_create_by(name:data['submitter']['user_name'], email:data['submitter']['user_email'], team:data['submitter']['team'])
          #@patient = Patient.create(case_id: data['case_id'], age: data['age'], submitter: submitter, last_name:data['last_name'], first_name:data['first_name'])
          #if @patient.valid?
          #  @patient.parse_json(data)
          #end
        end
        puts 'import ' + filename + ' completed'
      end
    end
  end

  desc "Run import cases"
  task :all => [:import_folder]

end

