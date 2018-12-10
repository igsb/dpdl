class PediaService < ApplicationRecord
  belongs_to :patient, optional: true
  belongs_to :user, optional: true
  belongs_to :pedia_status, optional: true

  validates :pedia_status_id, presence: true
  validates :job_id, uniqueness: true, allow_nil: true
  require 'open3'

  # perform and error are functios for delayed job
  def perform()
    self.run_pedia
  end

  def error(job, exception)
    unless self.pedia_status.normal_failed?
      status = PediaStatus.find_by(status: PediaStatus::UNKNOWN_FAILED)
      self.pedia_status_id = status.id
      self.save
    end
  end

  def run_pedia
    self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::PRE_RUNNING).id
    self.save
    # path for running PEDIA
    pedia_id = self.id
    case_id = self.patient.case_id.to_s
    Delayed::Worker.logger.info('Start PEDIA for case: ' + case_id)
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

    done_file = File.join(service_path, case_id, pedia_id.to_s, 'preproc.done')
    cmd = ['.', activate_path, 'pedia;', snakemake_path, done_file].join ' '
    log_path = File.join("#{Rails.root}", 'log', 'pedia', case_id, pedia_id.to_s)
    unless File.directory?(log_path)
      FileUtils.mkdir_p(log_path)
    end

    # Run preprocessing to generate phenomized json
    # First cmd is:
    # . activate pedia; snakemake --nolock
    # Data/PEDIA_service/case_id/preproc.done
    out_log = File.join(log_path, 'preprocess.log')
    logger = Logger.new(out_log)
    Thread.abort_on_exception = true
    Open3.popen3(cmd) do |stdin, stdout, stderr, thread|
      # read each stream from a new thread
      { out: stdout, err: stderr }.each do |key, stream|
        Thread.new do
          until (raw_line = stream.gets).nil? do
            logger.info("#{raw_line.delete!("\n")}")
          end
        end
      end
      unless thread.value.success?
        self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::PRE_FAILED).id
        self.save
        raise 'Preprocess failed, case: ' + case_id
      end
      thread.join
    end

    self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::WORKFLOW_RUNNING).id
    self.save
    result_path = File.join(service_path, case_id, pedia_id.to_s, case_id + '.csv')
    cmd = ['.', activate_path, 'pedia;', snakemake_path, result_path].join ' '
    out_log = File.join(log_path, 'workflow.log')
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
      unless thread.value.success?
        self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::WORKFLOW_FAILED).id
        self.save
        raise 'Workflow failed, case: ' + case_id
      end
      thread.join
    end
    self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::COMPLETE).id
    self.save
  end
end
