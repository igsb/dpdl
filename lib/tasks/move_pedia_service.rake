require 'csv'
namespace :pedia do
  desc 'move resuls file in pedia_service folder'
  task :move_results => :environment do
    status = PediaStatus.find_by_status('Complete')
    services = status.pedia_services
    service_path = 'Data/PEDIA_service/'
    services.each do |service|
      case_id = service.patient.case_id
      result_path = File.join(service_path, case_id.to_s, service.id.to_s, case_id.to_s + '.csv')
      unless File.exist?(result_path)
        msg = ['Result file not in pedia service dir:',
               case_id.to_s,
               service.id.to_s].join(' ')
        puts msg
        old_result_path = File.join(service_path, case_id.to_s, case_id.to_s + '.csv')
        if File.exist?(old_result_path)
          path = File.join(service_path, case_id.to_s, service.id.to_s)
          FileUtils.mkdir_p(path)
          FileUtils.cp(old_result_path, result_path)
        else
          msg = ['Fatal: old result file not in pedia service dir:',
                 case_id.to_s,
                 service.id.to_s].join(' ')
          puts msg
        end
      end
    end
  end
end
