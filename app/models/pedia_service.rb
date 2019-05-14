class PediaService < ApplicationRecord
  belongs_to :patient, optional: true
  belongs_to :user, optional: true
  belongs_to :pedia_status, optional: true
  belongs_to :vcf_file, optional: true
  belongs_to :uploaded_vcf_file, optional: true

  has_many :pedia
  validates :pedia_status_id, presence: true
  validates :job_id, uniqueness: true, allow_nil: true
  require 'open3'
  require 'csv'

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
    lab_id = self.patient.lab.id.to_s
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
    service_path = 'Data/PEDIA_service/labs'

    done_file = File.join(service_path, lab_id, case_id, pedia_id.to_s, 'preproc.done')
    cmd = ['.', activate_path, 'pedia;', snakemake_path, done_file].join ' '
    log_path = File.join("#{Rails.root}", 'log', 'pedia', lab_id, case_id, pedia_id.to_s)
    unless File.directory?(log_path)
      FileUtils.mkdir_p(log_path)
    end

    # Run preprocessing to generate phenomized json
    # First cmd is:
    # . activate pedia; snakemake --nolock
    # Data/PEDIA_service/case_id/preproc.done
    out_log = File.join(log_path, 'preprocess.log')
    #logger = Logger.new(out_log)
    Thread.abort_on_exception = true
    Open3.popen3(cmd) do |stdin, stdout, stderr, thread|
      # read each stream from a new thread
      #{ out: stdout, err: stderr }.each do |key, stream|
      #  Thread.new do
      #  Delayed::Worker.logger.info(key)
      #  Delayed::Worker.logger.info(stream)
      #  unless stream.closed?
      #      until (raw_line = stream.gets).nil? do
      #        logger.info("#{raw_line.delete!("\n")}")
      #      end
      #    end
      #  end
      #end
      unless thread.value.success?
        self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::PRE_FAILED).id
        self.save
        raise 'Preprocess failed, case: ' + case_id
      end
      thread.join
    end

    self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::WORKFLOW_RUNNING).id
    self.save
    result_path = File.join(service_path, lab_id, case_id, pedia_id.to_s, case_id + '.csv')
    cmd = ['.', activate_path, 'pedia;', snakemake_path, result_path].join ' '
    out_log = File.join(log_path, 'workflow.log')
    #logger = Logger.new(out_log)
    Open3.popen3(cmd) do |stdin, stdout, stderr, thread|
      ## read each stream from a new thread
      #{ out: stdout, err: stderr }.each do |key, stream|
      #  Thread.new do
      #    unless stream.closed?
      #      until (raw_line = stream.gets).nil? do
      #        logger.info("#{raw_line.delete!("\n")}")
      #      end
      #    end
      #  end
      #end
      unless thread.value.success?
        self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::WORKFLOW_FAILED).id
        self.save
        raise 'Workflow failed, case: ' + case_id
      end
      thread.join
    end

    out_path = File.join(service_path, lab_id, case_id, pedia_id.to_s)
    run_qc_report(out_path)

    self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::WORKFLOW_COMPLETE).id
    self.save

    parse_pedia(result_path, log_path)
    upload_vcf(log_path)
    self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::COMPLETE).id
    self.save
  end

  def run_qc_report(path)
    begin
      case_id = self.patient.case_id.to_s
      f_ann_name = File.join(path, case_id + '_annotated_quality.vcf.gz')
      if File.extname(f_ann_name) == '.gz'
        outfile = File.basename(f_ann_name, '.gz')
        cmd = %Q(bgzip -d -c #{f_ann_name} | awk '{{gsub(/chr/,""); print}}' > #{outfile})
        system(cmd)
        passed, output = SimilarityJob.new(outfile).run
        File.delete(outfile) if File.exist?(outfile)
      else
        passed, output = SimilarityJob.new(f_ann_name).run
      end
      result = passed ? 'Passed' : 'Failed'
    rescue StandardError => e
      result = 'Error'
      output = nil
      error_path = File.join(path, 'report_error.log')
      File.open(error_path, 'w') { |file| file.write(e.message) }
    end
    self.uploaded_vcf_file.quality_result = result
    self.uploaded_vcf_file.quality_report_path = output
    self.uploaded_vcf_file.save
  end

  def upload_vcf(log_path)
    self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::UPLOADING_RESULTS_VCF_RUNNING).id
    self.save
    out_log = File.join(log_path, 'upload_vcf.log')
    logger = Logger.new(out_log)
    begin
      case_id = self.patient.case_id.to_s
      lab_id = self.patient.lab.id.to_s
      f_ann_name = case_id + '_annotated.vcf.gz'
      f_name = case_id + '_pedia.vcf.gz'
      f = File.join("#{Rails.root}", 'Data/PEDIA_service/labs', lab_id, case_id, self.id.to_s, f_name)
      f_ann_full_name = File.join("#{Rails.root}", 'Data/PEDIA_service/labs', lab_id, case_id, self.id.to_s, f_ann_name)
      tmp = File.join("#{Rails.root}", 'Data/PEDIA_service/labs', lab_id, case_id, self.id.to_s, 'tmp.vcf.gz')
      FileUtils.cp(f, tmp)
      e=%x@gunzip -d -f "#{tmp}"@
      tmp.sub!(/\.gz$/, '')
      infile = File.open(tmp)
      login = User.find_by_username('admin')
      vcf_file, warnings, alerts = VcfFile.add_file(infile, f, f_name, login, self.id)
      vcf_file.create_samples(case_id, lab_id)
      vcf_file.parse_vcf(infile)
      #vcf_file.create_tabix
      vcf_file.name = f_ann_name
      vcf_file.full_path = f_ann_full_name
      vcf_file.save
      FileUtils.rm(tmp)
    rescue StandardError => e
      self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::UPLOADING_RESULTS_VCF_FAILED).id
      self.save
      logger.error("Error while uploading VCF")
      raise 'Uploading PEDIA scores failed, PEDIA service: ' + self.id.to_s
    end
    self.vcf_file_id = vcf_file.id
    self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::UPLOADING_RESULTS_VCF_COMPLETE).id
    self.save
  end

  def parse_pedia(pedia_file, log_path)
    self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::UPLOADING_RESULTS_SCORE_RUNNING).id
    self.save
    out_log = File.join(log_path, 'upload_pedia_score.log')
    logger = Logger.new(out_log)
    begin
      lines = CSV.open(pedia_file).readlines
      keys = lines.delete lines.first

      data = lines.map do |values|
        is_int(values) ? values.to_i : values.to_s
        Hash[keys.zip(values)]
      end
      for gene in data
        gene_id = gene['gene_id'].to_i
        gene_name = gene['gene_name']
        entrez_gene = Gene.find_by(entrez_id: gene_id)
        if entrez_gene.nil?
          entrez_gene = Gene.create(entrez_id: gene_id, name: gene_name)
        end
        if gene_name != entrez_gene.name
          entrez_gene.name = gene_name
          entrez_gene.save
        end

        pedia = gene['pedia_score']

        cadd = 0
        if gene.key?("cadd_score")
          cadd = gene['cadd_score'].to_f
        end

        pheno = 0
        if gene.key?("pheno_score")
          pheno = gene['pheno_score'].to_f
        end

        gestalt = 0
        if gene.key?("gestalt_score")
          gestalt = gene['gestalt_score'].to_f
        end

        feature = 0
        if gene.key?("feature_score")
          feature = gene['feature_score'].to_f
        end

        boqa = 0
        if gene.key?("boqa_score")
          boqa = gene['boqa_score'].to_f
        end
        if entrez_gene.nil?
          puts gene_id
          puts gene['gene_name']
          next
        end

        label = gene['label']
        p = Pedium.find_or_create_by(pedia_service_id: self.id, gene_id: entrez_gene.id, patient_id: self.patient_id)
        p.pedia_score = pedia
        p.feature_score = feature
        p.gestalt_score = gestalt
        p.pheno_score = pheno
        p.boqa_score = boqa
        p.cadd_score = cadd
        p.label = label
        p.save
        self.patient.result = true
        self.patient.save
      end
    rescue StandardError => e
      self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::UPLOADING_RESULTS_SCORE_FAILED).id
      self.save
      logger.error("Error while uploading PEDIA scores")
      raise 'Uploading PEDIA scores failed, PEDIA service: ' + self.id.to_s
    end
    self.pedia_status_id = PediaStatus.find_by(status: PediaStatus::UPLOADING_RESULTS_SCORE_COMPLETE).id
    self.save
  end

  def is_int(str)
    # Check if a string should be an integer
    return !!(str =~ /^[-+]?[1-9]([0-9]*)?$/)
  end

end
