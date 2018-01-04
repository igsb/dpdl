class VcfFilesController < ApplicationController
  before_action :only => [:filter] do |c| 
    if !params[:vcf] then
      flash[:alert] = "Please select a VCF file!"
      redirect_to vcf_select_path and return
    else
      params[:vcf].each do |f|
        next if f =~ /^BS_/
        f =~ /(\d+)#?(\d+|\*)?/
        vcf_id = Regexp.last_match[1].to_i
        vcf_file = VcfFile.find(vcf_id)
        c.authorise_as_sharer( vcf_file.user_ids, session[:comm_back] )
      end
    end    
  end

  before_action :only => [:preproc] do |c|
    @indiv = 0
    if !params[:vcf] then
      @vcf_file = @current_login.user.vcf_files[0]
    else
      params[:vcf] =~ /(\d+)#?(\d+|\*)?/
      vcf_id = Regexp.last_match[1].to_i
      indivp = Regexp.last_match[2]
      @vcf_file = VcfFile.find(vcf_id)
      if indivp == '*' && !@vcf_file.ped.blank?
        @multi = true
      else
        @multi = false
        @indiv = indivp.to_i
        @indiv -= 1 unless @indiv == 0
      end
      # Rails.logger.error( "\n\n\n\>>>>>>>>>>>>> ind: " + @indiv.to_s )
      params[:indiv] = @indiv
    end

    if @vcf_file == nil then
      flash[:alert] = "Please upload a VCF file first"
      redirect_to vcf_new_path and return
    end
    c.authorise_as_sharer( @vcf_file.user_ids, session[:comm_back] )
  end

  before_action :only => [ :data ] do |c|
    @vcf_file = VcfFile.find_by_id(params[:id])
    if @vcf_file.blank?
      flash[:alert] = "Please select a VCF file"
      redirect_to vcf_new_path and return
    end
    if @current_login
      c.authorise_as_sharer(@vcf_file.user_ids, session[:comm_back])
    elsif @vcf_file.user_id != 8
      flash[:alert]  = "You do not have permissions to change this record"
      redirect_to root_path and return
    end
  end


  #######################################################################
  def locator
  end


  #######################################################################
  def phenix
  end


  #######################################################################
  def proc_phenix
    #  output = params.to_yaml
    vcf=VcfFile.find_by_id( params[:id] )
    cmd = %Q|curl -s -H "enctype: multipart/form-data" -d hpot=#{params[:hpot]} -d inheritance=#{params[:inheritance]}  -d frequency=#{params[:frequency]} -d nshow=20 --data-urlencode ufile@Data/vcf/tom_Test_CompHet.vcf  https://www.gene-talk.de/sandbox/index 2>> log/phenix |
    output = '<h1>Moin!</h1>' + %x|#{cmd}|
    #       output = %x[curl -s http://www.kamphans.de]
    render :text => output.html_safe, :content_type => 'text/html'
  end


  #######################################################################
  # GET /data/1/file.pdf

  def data
    if @current_login
      #      if @current_login.admin?
      user = Login.find_by_user_id( @vcf_file.user_id ).username
      file = VcfFile.vcf_to_path( user, params[:name] )
      #      else
      #        file = VcfFile.vcf_to_path( @current_login.username, params[:name] )
      #      end
      if !@current_login.user.licensed?
        if params[:name] =~ /QualityReport/
          params[:name] = 'QualityReport_Example.pdf' 
          file = "#{Rails.root}/public/QualityReport_Example.pdf"
        end
      end
    else
      file = VcfFile.vcf_to_path( Login.find(8).username, params[:name] )
    end  
    if !File.exists? file
      flash[:alert] = "File not found: #{file}"
      redirect_to vcf_files_path and return
    end

    params[:name] =~ /\.([^\.]+)$/
    ext = Regexp.last_match(1)
    if ext == 'pdf'
      type = 'application/pdf'
      disp = 'inline'
      # disp = 'attachment'
    else 
      type = 'image' 
      disp = 'inline'
    end 

    send_file( file, :type => type, :disposition => disp, :filename => params[:name], :x_sendfile => true )
  end


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
        tdir = File.join( VcfFile::VCF_PATH, fname )
        zipfile = params[:upload]['datafile'].tempfile.path
        FileUtils.rmtree( tdir )    
        Dir.mkdir( tdir, 0700 )
        %x@unzip -aa -j "#{zipfile}" -d "#{tdir}"@ 

        files = Dir.glob( File.join(tdir, "**") )
        output = "#{tdir} \n\n"
        files.each do |f|                                      
          infile = File.open( f )
          name = File::basename( f )
          @vcf_file, w, a = VcfFile.add_file( infile, f, name, login )
          warnings << w
          warnings << a
        end
        FileUtils.rmtree( tdir )
      elsif fname =~ /gz$/ || fname =~ /txt$/  
        f = "#{Rails.root}/#{VcfFile::VCF_TEMP}/#{fname}"
        FileUtils.cp( params[:upload]['datafile'].tempfile.path, f )
        e=%x@/bin/gzip -d -f "#{f}"@
        f.sub!(/\.gz$/,'')
        infile = File.open( f )
        name = File::basename( f )
        @vcf_file, warnings, alerts = VcfFile.add_file( infile, f, name, login )
        FileUtils.rm_f f       
      else
        infile = params[:upload]['datafile'].open   
        tempfile = params[:upload]['datafile'].tempfile.path
        @vcf_file, warnings, alerts = VcfFile.add_file( infile, tempfile, fname, login )
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
  # GET /excel_new
  def new_excel
  end

  #######################################################################
  # POST /excel_create
  def create_excel
    if params[:upload].blank?
      flash[:alert] = "Please select a file for upload"
      redirect_to vcf_new_path and return
    end
    if params[:consent_given].blank?
      flash[:alert] = "Please get the patient's consent to analyze the data!"
      redirect_to vcf_new_path and return
    end

    sheet_num = params[:worksheet].to_i - 1
    chr_col = params[:chr_col].to_i
    pos_col = params[:pos_col].to_i
    gt_col = params[:gt_col].to_i

    filename = params[:upload]['datafile'].tempfile.path
    filename_ext = ''
    if params[:upload][:datafile].original_filename =~ /xlsx$/
      filename_ext = filename + '.xlsx'
      FileUtils.cp filename, filename_ext
      workbook = Excelx.new( filename_ext )
    elsif params[:upload][:datafile].original_filename =~ /xls$/
      filename_ext = filename + '.xls'
      FileUtils.cp filename, filename_ext
      workbook = Excel.new( filename_ext )
    elsif params[:upload][:datafile].original_filename =~ /ods$/
      filename_ext = filename + '.ods'
      FileUtils.cp filename, filename_ext
      workbook = Excel.new( filename_ext )
    else
      flash[:alert] = "Please upload am XLS, XLSX or ODS file"      
      redirect_to excel_new_path and return        
    end

    vcf_name = File.basename( params[:upload]['datafile'].original_filename ).dup
    vcf_name.gsub!(/[^\w\.\-]/,'_')
    vcf_name.sub!(/\.(xls|xlsx|ods)$/i, '.vcf')

    path = VcfFile.vcf_to_path( @current_login.username, vcf_name )

    if File.exist?( path )
      FileUtils.rm filename_ext
      flash[:alert] = "File aready exists"
      redirect_to vcf_new_path and return
    end 

    if workbook.sheets.length <= sheet_num || sheet_num < 0   
      FileUtils.rm filename_ext
      flash[:alert] = "The worksheet you specified does not exist."
      redirect_to excel_new_path and return        
    end

    workbook.default_sheet = workbook.sheets[ sheet_num ]

    if workbook.last_column.blank?
      FileUtils.rm filename_ext
      flash[:alert] = "The worksheet you specified seems to be empty."
      redirect_to excel_new_path and return        
    end      
    if workbook.last_column < chr_col || workbook.last_column < pos_col || workbook.last_column < gt_col || chr_col < 1 || pos_col < 1 || gt_col < 1
      FileUtils.rm filename_ext
      flash[:alert] = "The column you specified does not exist."
      redirect_to excel_new_path and return        
    end

    outfile = File.open( path, 'w')
    outfile.print <<EOT
##fileformat=VCFv4.0
##reference=GRCh37
##source=#{params[:upload]['datafile'].original_filename}
#CHROM\tPOS\tID\tREF\tALT\tQUAL\tFILTER\tINFO\tFORMAT\tINDIVIDUAL
EOT
    redis_reconnect

    lines = 0
    workbook.first_row.upto workbook.last_row do |i|
      chrom = workbook.cell( i, chr_col ).to_i
      pos   = workbook.cell( i, pos_col ).to_i
      gt    = workbook.cell( i, gt_col ) 
      ref = redis_get( chrom, pos, 'r' ) || 'N'
      gt =~ /([^\/])\/([^\/])/
      first_s = Regexp.last_match(1)
      sec_s = Regexp.last_match(2)
      alt = []
      if first_s == ref
        first = 0
      else 
        alt << first_s
        first = 1
      end
      if sec_s == ref
        sec = 0
      else 
        alt << sec_s
        sec = alt.length
      end
      outfile.puts chrom.to_s + "\t" +
        pos.to_s + "\t" + 
        '.' + "\t" + 
        ref + "\t" +
        alt.join(',') + "\t" + 
        '.' + "\t" +
        '.' + "\t" +
        '.' + "\t" +
        'GT' + "\t" +
        first.to_s + '/' + sec.to_s + "\n";
      lines += 1
    end
    outfile.close

    vcf_file = VcfFile.new( :name => vcf_name, 
                           :scanned => false,
                           :filtered => false,
                           :user_id => @current_login.user_id,
                           :lines => lines );
    @current_login.user.vcf_files << vcf_file;
    vcf_file.save
    vcf_file.reload

    Delayed::Job.enqueue( PreprocJob.new( vcf_file.id, @current_login.user_id ), :queue => ( vcf_file.is_premium?( @current_login ) ? 'prio' : 'basic' ) )

    redirect_to vcf_files_path

  end # create_excel

  #######################################################################
  def mutation_report
    @vcf_id = params[:id]
    @nr_indiv = (params[:ind] || '1').to_i - 1
    @vcf_file = VcfFile.find( @vcf_id )
    path = @vcf_file.fullname

    @outdata = []
    @finfo = []
    @debug = ""

    redis_reconnect
    if $redis[0] == nil || $redis[1] == nil || $redis[2] == nil || $redis[3] == nil || $redis[4] == nil || $redis[5] == nil 
      flash[:alert] = "We are sorry, filtering is currently not possible."
      redirect_to vcf_select_path and return
    end   

    @lang = @current_login.user.pref_language || 0

    inpfile = File.open( path )

    inpfile.each do |line|
      line.chomp!

      if line =~ /^##GeneTalk_(.*)/
        info = Regexp.last_match(1)
        info =~ /([^=@]*)(?:@(\d+))?=([^=]*)/
        ikey = Regexp.last_match(1)
        pass = Regexp.last_match(2).blank? ? 0 : Regexp.last_match(2).to_i
        ival = Regexp.last_match(3)
        ival.gsub! /,(?!\s)/, ', '
        if ival != 'None'
          @finfo[pass] = {}  unless @finfo[pass]
          @finfo[pass][ikey] = ival
        end
      end

      @name_indiv = VcfTools.indiv_name( line, @nr_indiv) if line =~ /^#CHROM/i

      next if line =~ /^#/

      next if line =~ /^$/

      next unless line =~ /^(chr)?(\d+|X|Y|M)\t/i
      chrom, pos, ident, ref, alt, qual, filter, info, format, *gt = line.split("\t");
      next if chrom == nil

      chrom_orig = chrom.dup
      chrom.sub!(/^chr/i, '')
      chrom =~ /(\d+|X|Y|M)/i;
      if Regexp.last_match == nil then
        c = 0
      else
        chrom = Regexp.last_match[1];        
        chrom.sub!(/X/i, '24');
        chrom.sub!(/Y/i, '25');
        chrom.sub!(/M/i, '26');
        c = chrom.to_i;
      end

      next if ( c < 1 ) || ( c > 26 )

      # get frequency vector
      frf = redis_vector( chrom, pos )

      target_collections = []
      @genes = ''
      info =~ /HGVS=([\w,-]+)[;:(]/
      matches = Regexp.last_match(1)
      @genes = matches.split(',') unless matches.blank?

      info_hash = VcfTools::parse_info( info )
      samples_hash = VcfTools::parse_sample_flags( format, gt[0] )
      lvl_dc, lvl_trust, lvl_exp_g = PositionFlag::maxima( frf['f'] )

      a = []
      a << print_chrom( chrom ) \
        << pos \
        << ident \
        << ref \
        << alt \
        << (@genes.blank? ? '' : @genes.join(',')) \
        << (info_hash[ :effect ] || '') \
        << (info_hash[ :hgvs ] || '' )\
        << (qual || '') \
        << VcfTools::get_coverage_string( info_hash, samples_hash ) \
        << lvl_dc \
        << lvl_trust
      @outdata << a 

    end # infile

    #respond_to do |format|
    #   format.xlsx
    #end
    render :xlsx => 'mutation_report.xlsx', :filename => "#{@vcf_file.name}_mutation_report.xlsx", :disposition => 'inline'
  end

  #######################################################################
  def filter_report
    @vcf_id = params[:id]
    @nr_indiv = (params[:ind] || '1').to_i - 1
    @vcf_file = VcfFile.find( @vcf_id )
    path = @vcf_file.fullname

    @outdata = []
    @finfo = []

    redis_reconnect
    if $redis[0] == nil || $redis[1] == nil || $redis[2] == nil || $redis[3] == nil || $redis[4] == nil || $redis[5] == nil 
      flash[:alert] = "We are sorry, filtering is currently not possible."
      redirect_to vcf_select_path and return
    end   

    @lang = @current_login.user.pref_language || 0

    inpfile = File.open( path )

    inpfile.each do |line|
      line.chomp!

      if line =~ /^##GeneTalk_(.*)/
        info = Regexp.last_match(1)
        info =~ /([^=@]*)(?:@(\d+))?=([^=]*)/
        ikey = Regexp.last_match(1)
        pass = Regexp.last_match(2).blank? ? 0 : Regexp.last_match(2).to_i
        ival = Regexp.last_match(3)
        ival.gsub! /,(?!\s)/, ', '
        if ival != 'None'
          @finfo[pass] = {}  unless @finfo[pass]
          @finfo[pass][ikey] = ival
        end
      end

      @name_indiv = VcfTools.indiv_name( line, @nr_indiv) if line =~ /^#CHROM/i

    end # infile

    render :xlsx => 'filter_report.xlsx', :filename => "#{@vcf_file.name}_filter_report.xlsx", :disposition => 'inline'

    # render :text => @finfo.inspect, :content_type => 'text/plain'
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

    session[:comment_back] = vcf_files_path

    respond_to do |format|
      format.html # index.html.erb
      #format.json { render :json => @vcf_files }
    end
  end

  #######################################################################
  # GET /vcf_files/1
  # GET /vcf_files/1.json
  #def _show 
  #  vcf_file = VcfFile.find(params[:id])
  #  path = vcf_file.fullname

  #  send_data( File.open( path ).read, :filename => vcf_file.name, :disposition => 'inline', :type => 'text/plain' );

  #end

  #######################################################################
  # GET /vcf_files/1
  # GET /vcf_files/1.json
  # Parameters: id, page, max, 
  def show_back

    @current_login = Login.last
    @vcf_id = params[:id]
    @vcf_file = VcfFile.find_by_id( @vcf_id )
    #@vcf_file = VcfFile.includes( :samples ).find_by_id( @vcf_id )
    #flash[:alert] = "VCF File not found" and redirect_to vcf_select_path and return if @vcf_file.blank?

    #if (@vcf_file.lines < 150000000)
    redirect_to :action => :pshow, id: @vcf_id
    return
    #end

    @user = @current_login.user
    path = @vcf_file.fullname

    if params[:ind] == '*' || (params[:ind].blank? && @vcf_file.samples.length > 1)
      @multi = true
      @nr_indiv = -1
      @indiv_from = 0
      @indiv_to = @vcf_file.number_of_samples - 1
    else
      @nr_indiv = (params[:ind] || '1').to_i - 1
      @indiv_from = @nr_indiv
      @indiv_to = @nr_indiv
    end

    num_lines = 100

    #if File.size( path ) > 60000
    #   send_data( File.open( path ).read, :filename => vcf_file.name, :disposition => 'inline', :type => 'text/plain' );
    #   return
    #end

    @outdata = []
    @finfo = []
    @name_indiv_file = []

    if params[:page] 
      @page = params[:page].to_i
    else
      @page = 1
    end

    @max = @vcf_file.get_lines

    @page = (@max/num_lines)+1 if @page == -1

    offset = (@page-1) * num_lines
    lines = 0
    lines_read = 0

    skip_to_chrom = 0
    skip_to_pos = 0
    skip_to_rsid = 0
    if !params[:rsid].blank?
      params[:rsid].gsub!(/\D/, '')
      skip_to_rsid = params[:rsid].to_i      
      offset = -1
    else
      if !params[:chrom].blank?
        skip_to_chrom = params[:chrom].to_i
        offset = -1
      end
      if !params[:position].blank?
        skip_to_chrom = 1 if skip_to_chrom == 0
        skip_to_pos = params[:position].to_i
        offset = -1
      end
    end
    alert = ''    
    @vcf_file.exclusive do
      begin
        #gfv = Gfv.new
        gfv = nil
        inpfile = File.open( path )

        inpfile.each do |line|
          line.chomp!

          if line =~ /^##GeneTalk_(.*)/
            info = Regexp.last_match(1)
            info =~ /([^=@]*)(?:@(\d+))?=([^=]*)/
            ikey = Regexp.last_match(1)
            pass = Regexp.last_match(2).blank? ? 0 : Regexp.last_match(2).to_i
            ival = Regexp.last_match(3).blank? ? '' : Regexp.last_match(3)
            ival.gsub! /,(?!\s)/, ', '
            if ival != 'None' 
              @finfo[pass] = {}  unless @finfo[pass]
              @finfo[pass][ikey] = ival
            end
          end

          @name_indiv_file = VcfTools.indiv_names( line, @indiv_from, @indiv_to ) if line =~ /^#CHROM/i

          next unless line =~ /^(chr)?(\d+|X|Y|M)\t/i

          lines_read += 1

          chrom, pos, ident, ref, alt, qual, filter, info, format, *gt = line.split("\t")
          vcf_line = VcfLine.new(line)
          chrom = vcf_line.chrom
          pos = vcf_line.pos

          next if chrom == nil
          next if ( chrom < 1 ) || ( chrom > 26 )

          if offset < 0
            next if chrom < skip_to_chrom
            next if pos.to_i < skip_to_pos
            if skip_to_rsid > 0
              rsid = vcf_line.ident.gsub(/\D/, '').to_i
              next if skip_to_rsid != rsid
            end
          end

          if offset < 0
            offset = 0
            @page = (lines_read / num_lines) +  2
          end

          lines += 1
          next if lines <= offset
          if lines > offset + num_lines
            if @max == 0
              next
            else
              break
            end
          end

          frf = nil #gfv.get_vector( chrom, pos )

          genotypes = []
          frequencies = []
          alt_allele = ''
          alt_alleles = []
          target_collections = []
          skip_this = false

          @indiv_from.upto( @indiv_to ) do |i|
            first = ''
            sec = ''

            if vcf_line.sample(i).blank?
              alert = "Unknown samples or not enough samples in line #{$.}"
              break
            end

            frequencies[i] = '-'

            first      = vcf_line.first_allele(i)
            sec        = vcf_line.second_allele(i)
            alt_allele = vcf_line.alt_allele(i)

            alt_alleles << alt_allele

            if first != '.'
              genotypes << first+'/'+sec

              #if !frf.empty? then
              #  freq = frf[first + sec].to_i
              #  count = frf['c'].to_i
              #  if count > 0
              #     frequencies[i] = freq.to_s + ' / ' + count.to_s  # "%.3f" % (freq*100.0 / count);
              #  end
              #end # frf.empty...else
            else
              skip_this = true unless @multi
              genotypes << './.'
            end
          end # treat genotypes

          next if skip_this

          @genes = vcf_line.genes

          #@TODO: speichereffizienter!
          if @genes != nil
            @genes.each do |i|
              # tc = TargetCollection.find_by_id( i.to_i )
              tc = TargetCollection.find_by_name( i )
              if tc.blank?
                tc = TargetCollection.new( :name => i )
              end
              target_collections << tc
            end
          end          

          # Handle flags
          gt_flags = []
          dp_flags = []
          cov_flags = []
          #          pri_values = []

          @indiv_from.upto( @indiv_to ) do |i|
            sample_flags = vcf_line.sample(i)
            gt_flags[i] = sample_flags.except(:_).sort_by{|k,v| k.to_s}.reduce(''){ |s,x| s << "\n#{x[0].to_s.upcase} = #{x[1].inspect}" }
            cov_flags << vcf_line.coverage( i )

            # Info: DP
            if vcf_line.info[:dp].present?
              val = vcf_line.info[:dp].to_i
              dp_flags << val
              gt_flags[i] << "\nDP=#{val}"
            end
          end

          show_anno = '1'#((frf['f'].to_i & 1) == 0) ? '0' : '1'

          show_precious = false
          #if (frf['a'].present?)
          #   annos = frf['a'].split(',')
          #   if annos.length == 1              
          #      show_anno = '0' if annos[0] == "8"
          #   end
          #       #    show_precious = (annos.include?('p') || annos.include?('q') ? '1' : '0')
          #   show_precious = (annos.include?('p') || annos.include?('q'))
          #end

          a = []
          a[ VcfFile::SHOW_CHROM     ] = chrom
          a[ VcfFile::SHOW_POS       ] = pos
          a[ VcfFile::SHOW_IDENT     ] = vcf_line.ident
          a[ VcfFile::SHOW_REF       ] = vcf_line.ref.upcase
          a[ VcfFile::SHOW_GT        ] = genotypes
          a[ VcfFile::SHOW_FREQ      ] = 0
          a[ VcfFile::SHOW_ANNO      ] = show_anno
          a[ VcfFile::SHOW_GENES     ] = target_collections
          a[ VcfFile::SHOW_EFF       ] = vcf_line.info.has_key?(:effect) ? vcf_line.info[:effect] : ''
          a[ VcfFile::SHOW_HGVS      ] = vcf_line.info.has_key?(:hgvs) ? vcf_line.info[:hgvs] : ''
          a[ VcfFile::SHOW_ALT       ] = alt_alleles
          #a[ VcfFile::SHOW_BLACKLIST ] = (frf['a'].blank? ? false : frf['a'].split(',').include?('8') )
          a[ VcfFile::SHOW_FLAGS     ] = gt_flags
          a[ VcfFile::SHOW_FLAGS_COV ] = cov_flags
          a[ VcfFile::SHOW_FLAGS_DP  ] = dp_flags.to_json
          a[ VcfFile::SHOW_PRECIOUS  ] = show_precious
          #a[ VcfFile::SHOW_PFLAGS    ] = frf['f']
          #          a[ VcfFile::SHOW_PRIOR     ] = pri_values
          @outdata << a;
          ## output << chrom.to_s + ' ' + pos.to_s + ' ' + ident.to_s + ' ' + ref + ' ' + alt + ' ' + first+'/'+sec + ' ' + lines.to_s + "/" + @max.to_s + "\n";

        end # infile
      ensure
        #gfv.close
      end
    end # exclusive

    # @TODO: needs more testing
    # if @vcf_file.samples.length > 0
    #   @name_indiv = @vcf_file.samples_ordered_array.map{ |s,i| s.name }
    # else
    @name_indiv = @name_indiv_file
    # end

    if !alert.blank?
      flash[:alert] = alert
      redirect_to vcf_files_path and return
    end

    @max ||= 0

    session[ :anno_back ] = vcf_file_path( @vcf_id )
    if @max == 0 
      @max = lines
    end

    @maxpage = (@max / num_lines) + 1;

    @parent_lines = nil
    if @vcf_file.parent_id != nil
      parent = VcfFile.find_by_id( @vcf_file.parent_id )
      if parent != nil
        @parent_lines = parent.lines
      end
    end

    if !session[:warning].blank?
      flash[:warning] = session[:warning]    
      session[:warning] = nil
    end
    ## render :text => output, :content_type => 'text/plain'
  end

  #########################VVVVVVVVVV
  def show
    #@current_login = current_user.login
    @user = current_user 
    @vcf_id = params[:id]

    gon.vcf_id = @vcf_id
    @name_indiv = @name_indiv_file
    if !alert.blank?
      flash[:alert] = alert
      redirect_to vcf_files_path and return
    end

    session[ :anno_back ] = vcf_file_path( @vcf_id )

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
    @p_vcf = @vcf_file.patients_vcf_files.take
    @patient = @vcf_file.patients.take
    @pedia = @patient.pedia.limit(10).order("pedia_score DESC")
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
    mut_scores = @p_vcf.disorders_mutations_scores.where('gene_id IN (?)', gene_array).group_by(&:position_id)
    alert = ''
    mut_scores.each do |lines|
      line_group = lines[1]
      gt_array = []
      pos = ''
      snp_id = ''
      gene_name = ''
      ref = ''
      effect = ''
      score = 0
      hgvs_array = []
      pedia_score = 0
      line_group.each do |line|
        mut_pos = line.mutations_position
        position = mut_pos.position
        annotation = mut_pos.annotations.take
        mut = mut_pos.mutation
        gene_mut = mut_pos.genes_mutations.take
        snp = annotation.dbsnps.take
        pos = "#{VcfTools.chrom_to_s(position.chr)}:#{position.pos}"
        gene_name = Gene.find(line.gene_id).name
        pedia_score = score_hash[line.gene_id]
        ref = mut.ref
        snp_id = ''
        effect = gene_mut.effect
        score  = line.value
        hgvs_array.push(annotation.hgvs)
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
          else
            gt_array.push(mut.alt)
          end
        end
      end
      gt_array = gt_array.uniq
      if gt_array.length == 1
        gt_array.push(gt_array[0])
      end
      genotype = gt_array.join('/')
      a = {
        :g  => genotype,
        :x  => pos,
        :i  => snp_id,
        :ge => gene_name,
        :r  => ref,
        :e  => effect,
        :s  => score,
        :h  => hgvs_array.join(';'),
        :p  => pedia_score
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


  #######################################################################
  def basespace_link
    require 'bio-basespace-sdk'
    bs_api = session[:basespace]
    data = {}
    data[:link] = nil
    code = ''
    pid = params[:id]

    project = BasespaceFile.where( :project_bid => pid, :device_code => nil ).first
    if project.present?
      if !bs_api.blank?
        #device_info = bs_api.get_verification_code("read project #{pid}, create projects")
        #data[:link] = device_info['verification_with_code_uri']
        ## data[:code] = device_info['device_code']
        #code = device_info['device_code']
      end
      BasespaceFile.where( :project_bid => pid ).each do |f|
        #        if f.device_code.blank?
        f.device_code = code
        f.save
        #        end
      end
    else
      data[:message] = "No project without device code found for project id #{pid}"
    end
    respond_to do |format|
      #      format.html {
      #      } 
      format.json {
        render :json => ActiveSupport::JSON.encode({ :status => 'valid', :message => data })
      } 
    end

  end

  def basespace_jtest
  end

  #######################################################################
  def select
    if !params[:id].blank?
      @vcf_select = params[:id].to_i
      @vcf_file = VcfFile.find_by_id( @vcf_select )
      @indiv = params[:ind] || '1'
    end
    u = @current_login.user
    @gene_sets = u.gene_sets
    @linkages = u.linkages

    @gsfselected = []

    # get files from basespace
    @basespace_files = []

    if session[:basespace].present?
      require 'bio-basespace-sdk'

      session[:basespace_login] = nil if session[:basespace_login].present?

      bs_api = session[:basespace]
      begin
        samples = nil
        #         projects = bs_api.get_project_by_user('current')
        #         projects.each do |project|
        res  = bs_api.get_app_session
        if res.References[0].content.is_a?( Bio::BaseSpace::Project )
          project = bs_api.get_project_by_id( res.References[0].content.Id )
          app_results = project.get_app_results( bs_api )
          app_results.each do |res|
            files = res.get_files( bs_api, { 'Extensions' => 'vcf' } )
            files.each do |f|
              basespace_file = BasespaceFile.where( :user_id => @current_login.user_id, :file_bid => f.Id ).first
              if basespace_file.blank?
                basespace_file = BasespaceFile.create( :user_id => @current_login.user_id,
                                                      :file_bid => f.Id,
                                                      :project_bid => project.Id,
                                                      :project_name => project.Name,
                                                      :appresult_bid => res.Id,
                                                      :file_name => f.Name.gsub( /[^\w\.\-]/, '_' ),
                                                      :date_created => f.DateCreated )
              end
              @basespace_files << basespace_file
            end
          end
          samples = project.get_samples( bs_api )
          samples.each do |sample|
            files = sample.get_files( bs_api, { 'Extensions' => 'vcf' } )
            files.each do |f|
              basespace_file = BasespaceFile.where( :user_id => @current_login.user_id, :file_bid => f.Id ).first
              if basespace_file.blank?
                basespace_file = BasespaceFile.create( :user_id => @current_login.user_id,
                                                      :file_bid => f.Id,
                                                      :project_bid => project.Id,
                                                      :project_name => project.Name,
                                                      :file_name => f.Name.gsub( /[^\w\.\-]/, '_' ),
                                                      :date_created => f.DateCreated )
              end
              @basespace_files << basespace_file
            end
          end
        end
      rescue => e
        Rails.logger.error "Basespace error #{e.message} #{e.backtrace.to_yaml}"
      end           
    end
    # end basespace 

    #    @vcf_files = u.plain_vcf_files.order( "updated_at DESC" )
    @vcf_files = u.vcf_files.order( "updated_at DESC" )
    # @ped_files = u.ped_files.order( "updated_at DESC" )
    @ped_files = u.vcf_files.where("ped is not null").order( "updated_at DESC" )
    @ped_files.delete_if{ |v| v.ped.split("\t").length < 2 }

    session[:comment_back] = vcf_select_path
    session[:back_gene_set_view] = vcf_select_path + '#genesets'
    session[:back_gene_set_edit] = vcf_select_path + '#genesets'

    @presets = @current_login.user.filter_presets.map{|x| [x.name.blank? ? "Unnamed" : x.name, x.id]}
    @presets.unshift ['Select preset', 0]
    @database = 'Redis'
  end

  #######################################################################
  # GET /vcf_files/1/download 
  def download
    if @current_login == nil 
      if params[:user].blank? || params[:pwd].blank?
        authenticate_login
      end
      @login = Login.find_by_username( params[:user] )
      if @login.blank?
        render :text => "Unknown user or wrong password", :content_type => 'text/plain'
        return
      end          
      if ! @login.valid_password?( params[:pwd] )
        render :text => "Unknown user or wrong password", :content_type => 'text/plain'
        return
      end  
      sign_in @login
    end

    vcf_file = VcfFile.find( params[:id] )
    outfilename = vcf_file.fullname

    send_file(outfilename, :filename => vcf_file.name, :disposition => 'attachment')
    # send_data( File.open( path ).read, :filename => vcf_file.name, :disposition => 'inline', :type => 'text/plain' );

  end

  #######################################################################
  # GET /vcf_files/1/share
  def share
    @id = params[:id]
    @filename = VcfFile.find( @id ).name
  end

  #######################################################################
  # POST /vcf_files/1/share
  def share_req
    id = params[:id]
    filename = VcfFile.find( id ).name
    if params[:names] != nil
      found, notfound = Message.send_share_message( @current_login, 'V', 'VCF file ' + filename, id, params[:names] )
      if found != []
        flash[:notice] = "Message sent to " + found.to_sentence
      end
      if notfound != []
        flash[:warning] = "User not found: " + notfound.to_sentence
      end
    end

    redirect_to vcf_files_path

  end

  #######################################################################
  def preproc_select
    u = @current_login.user

    @vcf_files = u.vcf_files.order("updated_at DESC")

    session[:comment_back] = vcf_select_path
  end

  #######################################################################
  def preproc  
    @output = ''
    if @vcf_file.locked
      flash[:alert] = "Your VCF file " + @vcf_file.name + " is currently being processed. Please wait until this process is finished."
      redirect_to vcf_preproc_select_path
      return
    end
    if (@vcf_file.preprocessors & (1 << (params[:processor].to_i - 1))) != 0
      flash[:alert] = "Your VCF file " + @vcf_file.name + " has already been processed by this preprocessor."
      redirect_to vcf_preproc_select_path
      return
    end

    #    pid = fork do ... end ... Process.detach( pid )
    case params[:processor].to_i
    when 1 then
      Delayed::Job.enqueue( AnnovarJob.new( @vcf_file.id, @current_login.user_id ) )
      # call_rake :annovar, :user => @current_login.user_id, :vcf => @vcf_file.id
    when 2 then
      call_rake :dbsnp, :user => @current_login.user_id, :vcf => @vcf_file.id
    else
      Rails.logger.error "Unknown preprocessor " + params[:processor].to_s + " " + params[:processor].class.to_s
    end
    flash[:notice] = "Your VCF file " + @vcf_file.name + " is now being processed. You will be notified upon completion "
    redirect_to vcf_preproc_select_path
  end

  #######################################################################
  def filter_progress_bar
    @filter_progress = FilterProgress.find_by_id( params[:id] )
    if @filter_progress.progress.to_i >= 0
      render :json => ActiveSupport::JSON.encode( @filter_progress.progress.to_i )
    else
      render :json => ActiveSupport::JSON.encode( -1 )
    end
  end

  #######################################################################
  #def filter
  def printfilterparams
    render :text => params.to_yaml, :content_type => 'text/plain'
  end       

  #######################################################################
  def filter
    #      if @current_login.id == 2
    #         render :text => params.to_yaml, :content_type => 'text/plain'
    #      end

    # File.open("#{Rails.root}/log/filter", 'a') {|f| f.puts params.to_yaml }
    if !@current_login.user.licensed?
      if @current_login.user.filter_last_day > 20
        flash[:alert] = "Daily filter quota exceeded! You need a GeneTalk Professional licence for unlimited filtering."
        redirect_to vcf_select_path and return
      end
    end 

    @output = ''  
    params[:output_name] = '*_filtered.vcf' if params[:output_name].blank? 
    params[:output_name] = '*' + params[:output_name] unless params[:output_name] =~ /\*/ || params[:vcf].length == 1
    filenumber = 0
    from_basespace = false
    params[:vcf].each do |f|
      from_basespace = false
      if f =~ /BS_(\d+)/
        bs_file_id = Regexp.last_match[1].to_i
        next if session[:basespace].blank?
        basespace_file = BasespaceFile.find_by_id( bs_file_id )
        next if basespace_file.blank?
        #          if basespace_file.auth_code.blank?
        #              begin
        #                 res=session[:basespace].update_privileges( basespace_file.device_code )
        #              rescue => e
        #                 %x@echo "==> Download error: #{e.message}" >> log/basespace@
        #                 flash[:alert] = "Please approve the access request from BaseSpace!"
        #                 redirect_to vcf_select_path and return
        #              end
        #              BasespaceFile.where( :device_code => basespace_file.device_code ).each do |f|
        #                 if f.auth_code.blank?
        #                    f.auth_code = res.api_key
        #                    f.save
        #                 end
        #              end
        #          end

        indivp = 1
        from_basespace = true
        @vcf_file = current_user.vcf_files.find_by_name( basespace_file.file_name )
        if  @vcf_file.blank?
          @vcf_file = VcfFile.create( :name => basespace_file.file_name, 
                                     :scanned => false,
                                     :filtered => 0,
                                     :preprocessors => 0,
                                     :sample_names => nil,
                                     :consent => 3,
                                     :user_id => @current_login.user_id )
        else
          @vcf_file.preprocessors = 0
          @vcf_file.save
        end
        basespace_file.vcf_file_id = @vcf_file.id
        basespace_file.save
      else
        f =~ /(\d+)#?(\d+|\*)?/
        vcf_id = Regexp.last_match[1].to_i
        indivp = Regexp.last_match[2]
        @vcf_file = VcfFile.find(vcf_id)
      end

      if indivp == '*' && !@vcf_file.ped.blank? && @vcf_file.ped.split("\t").length > 1
        @multi = true
        @indiv = 0

        return if abort_unlicensed_user( 'Filtering more than one sample', '(Select one sample from your file by clicking the + icon).' )

      else
        @multi = false
        @indiv = indivp.to_i
        @indiv -= 1 unless @indiv == 0
      end
      params[:indiv] = @indiv

      ###################################################
      # Open files

      @outname = params[:output_name].dup                  
      @outname.sub!( /\*/, @vcf_file.name.sub(/(\.vcf)?$/, '') )
      if !@vcf_file.sample_names.blank?
        iname = @vcf_file.sample_names_array.at( @indiv )
        @outname.sub!( /\%/, iname ) unless iname.blank?        
      end
      @outname.sub!( /\#/, filenumber.to_s )
      filenumber += 1
      @outname.gsub!( /[^\w\.\-]/, '_' )
      @vcf_filtered = current_user.vcf_files.find_by_name( @outname )
      if @vcf_filtered == nil
        @vcf_filtered = VcfFile.new( :name => @outname, 
                                    :scanned => true,
                                    :user_id => @current_login.user_id
                                   );

      else 
        @current_login.user.vcf_files.delete( @vcf_filtered )
        #          if !@vcf_filtered.filtered
        #            flash[:warnings] ||= ''
        #            flash[:warnings] << "#{outfilename}: File aready exists, file #{@vcf_file.name} not filtered! \n"
        #            next
        #          end            
      end
      @vcf_filtered.ped = @vcf_file.ped
      @vcf_filtered.parent_id = @vcf_file.id
      @vcf_filtered.flags = @vcf_file.flags
      @vcf_filtered.preprocessors = @vcf_file.preprocessors
      @vcf_filtered.filtered = @vcf_file.filtered + 1
      @vcf_filtered.save

      ######################################################################################################

      @process = FilterProgress.create( :vcf_id => @vcf_file.id, :user_id => @current_login.user_id )

      # if params[:background] || params[:vcf].length > 1
      if from_basespace
        @job = Delayed::Job.enqueue( BasespaceJob.new( params, @vcf_file, @vcf_filtered, @process.id, @indiv, @multi, @current_login, session[:basespace], basespace_file ), :queue => ( @vcf_file.is_premium?( @current_login ) ? 'prio' : 'basic' ) )
        #                                       BasespaceJob.new( params, @vcf_file, @vcf_filtered, @process.id, @indiv, @multi, @current_login, session[:basespace], basespace_file ).perform
      else
        if @current_login.id < 0
          begin
            warnings = FilterJob.new( params, @vcf_file, @vcf_filtered, @process.id, @indiv, @multi, @current_login ).perform
          rescue => ex
            flash[:alert] = ex.message
          ensure  
            flash[ :warning ] = warnings unless warnings.blank?
            redirect_to '/vcf_file/' + @vcf_filtered.id.to_s + ( @multi ? '/*' : '') + '/?page=1'
            return
          end
        else
          if @vcf_file.is_premium?( @current_login )
            @job = Delayed::Job.enqueue( FilterJob.new( params, @vcf_file, @vcf_filtered, @process.id, @indiv, @multi, @current_login ), :queue => 'prio' )
          else
            @job = Delayed::Job.enqueue( FilterJob.new( params, @vcf_file, @vcf_filtered, @process.id, @indiv, @multi, @current_login ), :queue => 'basic', :run_at => 1.minutes.from_now )
          end
        end

      end
      # else
      # begin                   
      #            warnings = FilterJob.new( params, @vcf_file, @vcf_filtered, @progress_id, @indiv, @multi, @current_login ).perform
      #                                    :params, :vcf_file, :vcf_filtered, :progress_id, :indiv, :multi, :login, :background
      #          rescue => ex
      #            flash[:alert] = ex.message
      #          ensure
      #   flash[ :warning ] = warnings unless warnings.blank?
      #   session[ :anno_back ] = vcf_file_path( @vcf_filtered.id )
      #   redirect_to '/vcf_file/' + @vcf_filtered.id.to_s + ( @multi ? '/*' : '') + '/?page=1'
      #   return
      # end
      #        end
    end 

    if params[:vcf].length > 1 || from_basespace
      redirect_to vcf_files_path, :notice => 'Your VCF files are being filtered, you will be notified upon completion.'
      return
    end

    # render :text => @output, :content_type => 'text/plain'
    # send_data( output, :filename => name, :disposition => 'inline', :type => 'text/plain' );
  end # filter

  #######################################################################
  def pselect
    @vcf_file = VcfFile.includes(:samples => :hpo_terms).find(params[:id])

    #    if @research_variant.first_sample.hpo_terms.blank?
    #      flash[:alert] = "Please specify HPO terms for sample before submitting a research variant"
    #      session[:proceed] = { :controller => :research_variants,
    #                            :action => :new,
    #                            :research_variant => params[:research_variant]
    #                          }.to_json
    #      redirect_to edit_sample_path( @research_variant.first_sample ) and return
    #    end
  end #pselect

  #######################################################################
  def prior
    if params[:sample].blank?
      flash[:alert] = 'Please select a sample'
      redirect_to :action => :pselect
      return
    end
    @vcf_file = VcfFile.includes(:samples => :hpo_terms).find(params[:id])
    @sample = @vcf_file.samples[ params[:sample].to_i ]
    @hpo_terms = @sample.hpo_terms.map{ |t| t.id }
    @hpo_terms << HpoTerm::scan_ids( params[ :hpo_terms ] )
    @hpo_terms.flatten!

    if @hpo_terms.empty?
      flash[:alert] = 'Please specify HPO terms'
      redirect_to :action => :pselect
      return
    end
    terms = @hpo_terms.map{ |t| HpoTerm::id_to_hpo(t) }.join(',')

    phenom = []
    # %x(curl 'http://compbio.charite.de/phenomizer/phenomizer/PhenomizerServiceURI?mobilequery=true&terms=#{terms}')

    phscores = {}

    phenom.split("\n").each do |line|
      pvalue,score,omim,text,gen,ensembl = line.split("\t")
      phscores[ gen ] = [pvalue,score]
    end

    @outname = @vcf_file.name.sub( /\.vcf/, '_prioritized.vcf')

    @vcf_out = current_user.vcf_files.find_by_name( @outname )
    if @vcf_out == nil
      @vcf_out = VcfFile.new( :name => @outname,
                             :scanned => true,
                             :user_id => @current_login.user_id
                            );
    end
    @vcf_out.ped = @vcf_file.ped
    @vcf_out.parent_id = @vcf_file.id
    @vcf_out.flags = @vcf_file.flags
    @vcf_out.preprocessors = @vcf_file.preprocessors
    @vcf_out.priors |= VcfFile::VCF_PRIOR_PHENOMIZER
    @vcf_out.filtered = @vcf_file.filtered
    @vcf_out.lines = @vcf_file.lines
    @vcf_out.copy_attributes( @vcf_file )
    @vcf_out.save

    @vcf_file.exclusive do
      begin
        outfile = File.open( @vcf_out.fullname, "w" )
        File.foreach( @vcf_file.fullname ) do |line|
          if line =~ /^#/
            outfile.puts line
            next
          end
          line.chomp!
          chrom, pos, ident, ref, alt, qual, filter, info, format, *gt = line.split("\t");

          #TODO: remove dirty hack!
          format.gsub!(/GTPP/,'X');
          format.gsub!(/GTPS/,'X');

          ##genes = VcfTools::get_genes( info )
          genes = nil
          if genes.present?
            scores = genes.map{ |g| (phscores.key?( g ) ? phscores[g] : nil)}.compact.transpose
            if !scores.empty?
              format << ":GTPP:GTPS"
              gt[ params[:sample].to_i ].concat ":#{scores[0].join(',')}:#{scores[1].join(',')}"
            end
          end
          outfile.puts "#{chrom}\t#{pos}\t#{ident}\t#{ref}\t#{alt}\t#{qual}\t#{filter}\t#{info}\t#{format}\t#{gt.join("\t")}"
        end #line
      ensure
        outfile.close
        @current_login.user.vcf_files << @vcf_out unless @current_login.user.vcf_files.include?( @vcf_out )
        @current_login.user.save
      end # begin
    end #exclusive

    #render :text => phscores.inspect, :content_type => 'text/plain'
    redirect_to vcf_file_path( @vcf_out.id )
  end #prior

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
    path = VcfFile.vcf_to_path( @current_login.username, fname )

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

end # class

