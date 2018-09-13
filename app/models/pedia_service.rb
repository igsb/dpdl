class PediaService < ApplicationRecord
  require 'open3'

  def run_pedia
    Rails.logger.info 'Activate PEDIA pipeline'
    # path for running PEDIA
    case_id = self.case_id.to_s
    if Rails.env.production?
      # this is for running on server
      # there are some issues for environment
      # so we use the environment from tzung's home folder
      activate_path = '/home/tzung/miniconda3/bin/activate'
      snakemake_path = '/home/tzung/miniconda3/bin/snakemake --nolock'
    else
      activate_path = 'activate'
      snakemake_path = 'snakemake --nolock'
    end
    service_path = 'Data/PEDIA_service/'

    done_file = File.join(service_path, case_id, 'preproc.done')
    cmd = ['.', activate_path, 'pedia;', snakemake_path, done_file].join ' '
    log_path = File.join("#{Rails.root}", 'log', 'pedia', case_id)
    unless File.directory?(log_path)
      FileUtils.mkdir_p(log_path)
    end

    # Run preprocessing to generate phenomized json
    # Todo:
    # connect following two preocess into one
    # First cmd is:
    # . activate pedia; snakemake --nolock
    # Data/PEDIA_service/case_id/preproc.done
    out_log = File.join(log_path, case_id + '_pre.out')
    logger = Logger.new(out_log)
    Open3.popen3(cmd) do |stdin, stdout, stderr, thread|
      # read each stream from a new thread
      { out: stdout, err: stderr }.each do |key, stream|
        Thread.new do
          until (raw_line = stream.gets).nil? do
            logger.info("#{raw_line.delete!("\n")}")
          end
        end
      end
      raise "Preprocess failed" unless thread.value.success?
      thread.join
    end

    result_path = File.join(service_path, case_id, case_id + '.csv')
    cmd = ['.', activate_path, 'pedia;', snakemake_path, result_path].join ' '
    out_log = File.join(log_path, case_id + '.out')
    logger = Logger.new(out_log)
    Open3.popen3(cmd) do |stdin, stdout, stderr, thread|
      # read each stream from a new thread
      { out: stdout, err: stderr }.each do |key, stream|
        Thread.new do
          until (raw_line = stream.gets).nil? do
            logger.info("#{raw_line.delete!("\n")}")
          end
        end
      end
      raise 'Workflow failed' unless thread.value.success?
      thread.join
    end
  end
end
