class VcfFilesController < ApplicationController
  before_action :verify_is_admin, only: [:index, :edit, :destroy, :update]

  #######################################################################
  # GET /vcf_files/new
  def new
  end

  #######################################################################
  # POST /vcf_files
  def create

    @current_login = current_user
    remote = false

    login = current_user

    if params[:upload].blank?
      if remote
        render :text => "Please select a file for upload", :content_type => 'text/plain'
        return
      else
        flash[:alert] = "Please select a file for upload"
        redirect_to new_vcf_file_path and return
      end
    end

    fname = File.basename( params[:upload]['datafile'].original_filename )

    warnings = ""
    alerts = ""
    ActiveRecord::Base.transaction do
      if fname =~ /zip$/
        tdir = File.join(VcfFile::VCF_PATH, fname)
        zipfile = params[:upload]['datafile'].tempfile.path
        FileUtils.rmtree(tdir)
        Dir.mkdir(tdir, 0700)
        %x@unzip -aa -j "#{zipfile}" -d "#{tdir}"@

        files = Dir.glob(File.join(tdir, "**"))
        output = "#{tdir} \n\n"
        files.each do |f|
          infile = File.open(f)
          name = File::basename(f)
          @vcf_file, w, a = VcfFile.add_file(infile, f, name, login)
          warnings << w
          warnings << a
        end
        FileUtils.rmtree(tdir)
      elsif fname =~ /gz$/ || fname =~ /txt$/
        f = "#{Rails.root}/#{VcfFile::VCF_TEMP}/#{fname}"
        FileUtils.cp(params[:upload]['datafile'].tempfile.path, f)
        e=%x@gunzip -d -f "#{f}"@
        f.sub!(/\.gz$/, '')
        infile = File.open(f)
        name = File::basename(f)
        @vcf_file, warnings, alerts = VcfFile.add_file(infile, f, name, login)
        FileUtils.rm_f f
      else
        infile = params[:upload]['datafile'].open
        tempfile = params[:upload]['datafile'].tempfile.path
        @vcf_file, warnings, alerts = VcfFile.add_file(infile, tempfile, fname, login)
      end

      flash[:warning] = warnings unless warnings.blank?

      if !alerts.blank?
        if remote
          render :text => alerts, :content_type => 'text/plain'
          return
        else
          puts alerts
          flash[:alert] = alerts
          redirect_to new_vcf_file_path and return
        end
      end

      if @vcf_file == nil
        flash[:alert] = alerts
        redirect_to new_vcf_file_path
        return
      end

      flash[:notice] = 'File successfully uploaded';

      if remote
        render :text => "OK", :content_type => 'text/plain'
        return
      end

      @vcf_file.create_samples
      @vcf_file.parse_vcf
      @vcf_file.create_tabix
      @vcf_file.name = @vcf_file.name + '.gz'
      @vcf_file.save
    end
    redirect_to :action => :index
  end

  #######################################################################
  # GET /vcf_files/1/edit
  def edit
    @vcf_file = VcfFile.find(params[:id])
  end

  #######################################################################
  # PUT /vcf_files/1
  # PUT /vcf_files/1.json
  def update
    @vcf_file = VcfFile.find(params[:id])

    if !params[:vcf_file][:comment].blank?
      @vcf_file.comment = params[:vcf_file][:comment]
      @vcf_file.save
    end

    params[:indiv].each_with_index do |name, i|
      if (!params[:phenotypes][i].blank?) && (!params[:description][i].blank?)
        @sample = @vcf_file.sampless.where( :indiv_id => i ).first
        if @sample.blank?
          @sample = Sample.new( :indiv_id => i )
          @vcf_file.patients << @patient
          @current_login.user.patients << @patient
        end
        @patient.phenotypes  = params[:phenotypes][i]
        @patient.description = params[:description][i]                                   
        @patient.save                                                  
      end
    end

    respond_to do |format|
      if @vcf_file.update_attributes(params[:patient])
        format.html { redirect_to @vcf_file, :notice => 'Vcf file was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @vcf_file.errors, :status => :unprocessable_entity }
      end
    end
  end

  #######################################################################
  # GET /vcf_files
  # GET /vcf_files.json
  def index
    @current_login = Login.last
    order = case params[:sort]
            when 'name' then 'name'
            when 'upload' then 'created_at DESC'
            else 'updated_at DESC'
            end

    #@vcf_files = current_user.vcf_files.order( 'name' )
    @vcf_files = VcfFile.all 
    puts @vcf_files.count
    session[:comment_back] = vcf_files_path

    respond_to do |format|
      format.html # index.html.erb
      #format.json { render :json => @vcf_files }
    end
  end

  #########################VVVVVVVVVV
  def show
    #@current_login = current_user.login
    @user = current_user
    @vcf_id = params[:id]
    @vcf = VcfFile.find(@vcf_id)
    puts @vcf.id

    gon.vcf_id = @vcf_id
    @name_indiv = @name_indiv_file
    if !alert.blank?
      flash[:alert] = alert
      redirect_to vcf_files_path and return
    end

    session[:anno_back] = vcf_file_path(@vcf_id)

    if !session[:warning].blank?
      flash[:warning] = session[:warning]
      session[:warning] = nil
    end
  end

  def get_var
    vcf_id = params[:id]
    get_pshow_var(vcf_id)
    render :json => ActiveSupport::JSON.encode(@result)
  end

  def get_pshow_var(vcf_id)
    @vcf_file = VcfFile.find_by_id(vcf_id)
    @p_vcf = @vcf_file.patients_vcf_files.last
    @patient = @vcf_file.patients.take
    if @patient.pedia_services.count > 0
      @pedia = @patient.pedia_services.last.pedia.limit(10).order("pedia_score DESC")
    else
      @pedia = @patient.pedia.limit(10).order("pedia_score DESC")
    end
    flash[:alert] = "VCF File not found" and redirect_to vcf_select_path and return if @p_vcf.blank?

    @var_count = 0
    @outdata = []
    gene_array = []
    score_hash = {}
    @pedia.each do |pedia_gene|
      gene_id = pedia_gene.gene_id
      gene_array.push(gene_id)
      score_hash[gene_id.to_i] = pedia_gene.pedia_score
    end
    mut_scores = @p_vcf.disorders_mutations_scores.where('gene_id IN (?)', gene_array)
    mut_scores.each do |line|
      gt_array = []
      pos = ''
      snp_id = ''
      gene_name = ''
      ref = ''
      effect = ''
      score = 0
      hgvs_array = []
      pedia_score = 0
      mut_ids = []
      gene_id = 0
      cs_score = 0

      mut_pos = line.mutations_position
      mut_ids << mut_pos.id
      position = mut_pos.position
      max_score = mut_pos.max_classification
      if max_score && max_score > cs_score
        cs_score = max_score
      end

      mut = mut_pos.mutation
      gene_mut = mut_pos.genes_mutations.take
      snp = mut_pos.dbsnps.take
      gene_id = line.gene_id
      pos = "#{VcfTools.chrom_to_s(position.chr)}:#{position.pos}"
      gene_name = Gene.find(line.gene_id).name
      pedia_score = score_hash[line.gene_id].round(3)
      ref = mut.ref
      snp_id = ''
      effect = gene_mut.effect
      score = line.value.round(2)
      mut_pos.mutations_hgvs_codes.each do |value|
        hgvs_array.push(value.hgvs_code)
      end
      if !snp.nil?
        snp_id = snp.snp_id
      end
      gt = line.genotype
      if gt.include? '|'
        gt = gt.split('|')
      elsif gt.include? '/'
        gt = gt.split('/')
      end
      gt.each do |value|
        if value == '0'
          gt_array.push(mut.ref)
        elsif value == '2'
          gt_array.push(mut.ref)
        else
          gt_array.push(mut.alt)
        end
      end

      genotype = gt_array.join('/')
      a = {
        g: genotype,
        x: pos,
        i: snp_id,
        ge: gene_name,
        gene_id: gene_id,
        r: ref,
        e: effect,
        s: score,
        h: hgvs_array.join(';'),
        p: pedia_score,
        m: mut_ids.join(','),
        cs_score: cs_score,
        v: @p_vcf.id
      }
      @var_count = @var_count + 1
      @outdata << a;
    end
    @result = {'var_num': @var_count, 'variants': @outdata}
  end

  #######################################################################
  # DELETE /vcf_files/1
  def destroy
    vcf_file = VcfFile.find_by_id(params[:id])

    if vcf_file != nil
      path = vcf_file.fullname
      if vcf_file.user_id == current_user.id
        File.delete( path ) if File.exist?( path )
        FileUtils.rm_rf( Dir.glob(vcf_file.fullname + '*'))

        vcf_file.destroy
      else
        current_user.vcf_files.delete( vcf_file )
      end
      flash[:notice] = 'File removed';
    else
      flash[:alert] = 'File not found';
    end

    redirect_to session[:comment_back]

  end

  ############################################################################
  # private

  # Todo: obsolete, replace with VcfFile::add_file
  def handle_upload( infile, tempfile, fname )
    @current_login = Login.last
    puts tempfile
    warnings = "" 
    alerts = ""
    l = infile.first
    l = l.encode("UTF-16be", :invalid=>:replace, :replace=>"?").encode('UTF-8')
    if l !~ /##fileformat=VCF/i
      alerts << "File #{fname}: Not a VCF file (invalid file format in header) \n" 
      return nil, warnings, alerts
    end
    ref_found = false
    sample_names = ''
    infile.each do |line|
      line = line.encode("UTF-16be", :invalid=>:replace, :replace=>"?").encode('UTF-8')
      line.chomp!
      if line =~ /^##reference=(.*)/i
        ref_found = true
        reference = Regexp.last_match(1)
        if !((reference =~ /1000GenomesPilot-NCBI36/i) || ( reference =~ /grch37/i ) || ( reference =~ /hg19/i ))
          warnings << "File #{fname}: Warning, wrong or unknown reference found, make sure that the reference for your VCF file is GRCh37/hg19 \n"
        end
      end
      if line =~ /^#chrom/i
        chrom, pos, ident, ref, alt, qual, filter, info, format, *gt = line.split("\t");
        sample_names = gt.join("\t")        
        warnings << "File #{fname}: Warning, no reference found, make sure that the reference for your VCF file is GRCh37/hg19 \n" unless ref_found
        break
      end
    end

    infile.rewind

    fname.gsub!(/[^\w\.\-]/,'_')
    path = VcfFile.vcf_to_path(fname)

    if File.exist?( path )
      alerts << "File #{fname}: File aready exists \n" 
      return nil, warnings, alerts
    end

    ## data = params[:upload]['datafile'].read     
    # write the file
    # File.open(path, "wb") { |f| f.write( data ) }
    vcf_file = VcfFile.new( :name => fname, 
                           #:scanned => false,
                           :filtered => false,
                           :sample_names => sample_names,
                           #:consent => params[:consent_given],
                           :user_id => @current_login.user_id );
    #          # :lines => %x{wc -l #{path}}.split.first.to_i );

    FileUtils.cp( tempfile, path )
    @current_login.user.vcf_files << vcf_file;
    @current_login.user.uploaded_count += 1
    @current_login.user.save

    vcf_file.save
    vcf_file.reload

    #Delayed::Job.enqueue( PreprocJob.new( vcf_file.id, @current_login.user_id ), :queue => ( vcf_file.is_premium?( @current_login ) ? 'prio' : 'basic' ) )

    return vcf_file, warnings, alerts
  end

  def verify_is_admin
    (current_user.nil?) ? redirect_to(root_path) : (redirect_to(root_path) unless current_user.admin?)
  end

end # class

