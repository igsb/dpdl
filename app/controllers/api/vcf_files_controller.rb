class Api::VcfFilesController < Api::BaseController
  before_action :authenticate_token

  require 'open3'
  # POST /vcf_files
  # saves the uploaded vcf file in the /data/received_vcffiles folder
  def create
    # validate file extension and that the file belongs to the correponding case_id
    if not validate_filename
      respond_to do |format|
        format.json { render plain: { msg: 'Invalid file' }.to_json, status: 400, content_type: 'application/json' }
      end
      return
    end

    fname = File.basename(params[:file].original_filename)
    case_id = params[:case_id]

    # check if the corresponding case is alredy created
    p = Patient.find_by_case_id(case_id)
    if p.nil?
      respond_to do |format|
        format.json { render plain: { msg: 'Corresponding case does not exist. Please create the case first' }.to_json,
		              status: 400, content_type: 'application/json' }
      end
      return
    end

    dirname = File.join("Data", "Received_VcfFiles")
    dir = "#{Rails.root}/#{dirname}"
    FileUtils.mkdir(dir) unless File.directory?(dir)

    f = "#{dir}/#{fname}"
    FileUtils.cp_r( params[:file].tempfile.path, f)
    vcf = UploadedVcfFile.find_by_file_name(fname)
    if vcf.nil?
      vcf = UploadedVcfFile.create(case_id: case_id, file_name: fname)
    else
      vcf.updated_at = Time.now.to_datetime
    end
    vcf.save
    activate_pedia(f, case_id)
    respond_to do |format|
      format.json { render plain: {msg: 'VCF file uploaded successfully. PEDIA workflow will be triggered' }.to_json,
	                status: 200, content_type: 'application/json' }
    end
  end

  def validate_filename
    valid = true
    fname = File.basename(params[:file].original_filename)
    case_id = fname.split('.')[0]
    caseid = params[:case_id]
    if case_id != caseid
      valid = false
    end
    if !(fname =~ /zip$/ || fname =~ /gz$/ || fname =~ /vcf$/)
      valid = false
    end

    return valid
  end

  def authenticate_token
    api_token, options = ActionController::HttpAuthentication::Token.token_and_options(request)
    token = ApiKey.where(access_token: api_token).first
    if token && !token.expired?

    else
      if token.expired?
        respond_to do |format|
          format.json { render plain: {error: 'Token expired' }.to_json, status: 401, content_type: 'application/json' }
        end
      else
        respond_to do |format|
          format.json { render plain: {error: 'Invalid token' }.to_json, status: 401, content_type: 'application/json' }
        end
      end
    end
  end

  def activate_pedia(vcf_path, case_id)
    # path for running PEDIA
    case_id = case_id.to_s
    if Rails.env.production?
      activate_path = '/home/tzung/miniconda3/bin/activate'
      snakemake_path = '/home/tzung/miniconda3/bin/snakemake'
    else
      activate_path = 'activate'
      snakemake_path = 'snakemake'
    end
    service_path = 'Data/PEDIA_service/'

    done_file = File.join(service_path, case_id, case_id + '_preproc.done')
    cmd = ['.', activate_path, 'pedia;', snakemake_path, done_file].join ' '
    log_path = File.join('log', 'pedia', case_id)
    unless File.directory?(log_path)
      FileUtils.mkdir_p(log_path)
    end
    out_log = File.join(log_path, case_id + '_pre.out')
    err_log = File.join(log_path, case_id + '_pre.err')
    pid = spawn(cmd, :out => out_log, :err => err_log)
    Process.detach(pid)

    result_path = File.join(service_path, case_id, case_id + '.csv')
    cmd = ['.', activate_path, 'pedia;', snakemake_path, result_path].join ' '
    out_log = File.join(log_path, case_id + '.out')
    err_log = File.join(log_path, case_id + '.err')
    pid = spawn(cmd, :out => out_log, :err => err_log)
    Process.detach(pid)
  end
end
