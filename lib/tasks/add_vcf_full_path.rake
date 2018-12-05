namespace :patient do

  desc "Update full path"
  task :update_vcf_full_path => :environment do |task|
    UploadedVcfFile.all.each do |vcf|
      case_id = vcf.patient.case_id.to_s
      vcf.full_path = File.join('Data/Received_VcfFiles/',
          case_id,
          vcf.file_name
        )
      vcf.save
    end
    VcfFile.all.each do |vcf|
      vcf.full_path = File.join('Data/vcf', vcf.name)
      vcf.save
    end
  end
end
