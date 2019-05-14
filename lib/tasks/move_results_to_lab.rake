require 'net/http'
require 'uri'
require 'json'
require 'mime/types'

namespace :lab do
  desc "Move results to lab folder"
  task :move_results => :environment do
    patients = Patient.all
    patients.each do |p| 
      lab_id = p.lab_id
      next if lab_id.nil?

      new_path = 'Data/PEDIA_service/labs/' + lab_id.to_s + '/' + p.case_id.to_s
      original_path = 'Data/PEDIA_service/' + p.case_id.to_s
      next unless Dir.exist?(original_path)
      if not Dir.exist?('Data/PEDIA_service/labs/' + lab_id.to_s)
        FileUtils.mkdir_p 'Data/PEDIA_service/labs/' + lab_id.to_s
      end
      FileUtils.copy_entry(original_path, new_path)
    end
  end

end
