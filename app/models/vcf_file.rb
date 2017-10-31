class VcfFile < ActiveRecord::Base
  belongs_to :user, :optional => true
  belongs_to :login, :optional => true

  delegate :login, :to => :user

  #belongs_to :parent, :class_name => 'VcfFile'

  #has_and_belongs_to_many :users

  #has_and_belongs_to_many :cases
  #has_many :sample_connections, :class_name => 'SamplesVcfFiles'

  has_many :patients_vcf_files, :dependent => :destroy
  has_many :patients, :through => :patients_vcf_files
  #has_many :disorders_mutation_scores, :through => :patients_vcf_files, :dependent => :destroy


  VCF_PATH = 'Data/vcf/'
  VCF_TEMP = 'Data/tmp/'

  VCF_PREPROC_CHECK      = 1
  VCF_PREPROC_ANNOVAR    = 2
  VCF_PREPROC_DBSNP      = 4
  VCF_PREPROC_SIMILARITY = 8
  VCF_PREPROC_CADD       = 128

  VCF_PRIOR_TASTER     = 1
  VCF_PRIOR_PHENOMIZER = 2

  PED_COL_LABEL      = 0
  PED_COL_FATHER     = 1
  PED_COL_MOTHER     = 2
  PED_COL_GENDER     = 3
  PED_COL_AFF_STATUS = 4
  PED_COL_ORIGIN     = 5
  PED_COL_SIBLINGS   = 6

  PED_AFF_UNKNOWN = 0
  PED_UNAFFECTED  = 1
  PED_AFFECTED    = 2

  PED_MALE       = 1
  PED_FEMALE     = 2

  PED_GENDER       = ['Unknown', 'Male', 'Female']
  PED_GENDER_SHORT = ['?', 'M', 'F']

  PED_AFF          = ['Unknown', 'Unaffected', 'Affected']
  PED_AFF_SHORT    = ['?', 'N', 'Y']

  SHOW_CHROM     = 0
  SHOW_POS       = 1
  SHOW_IDENT     = 2
  SHOW_REF       = 3
  SHOW_GT        = 4
  SHOW_FREQ      = 5
  SHOW_ANNO      = 6
  SHOW_GENES     = 7
  SHOW_EFF       = 8
  SHOW_HGVS      = 9
  SHOW_ALT       = 10
  SHOW_BLACKLIST = 11
  SHOW_FLAGS     = 12
  SHOW_FLAGS_COV = 13
  SHOW_FLAGS_DP  = 14
  SHOW_PRECIOUS  = 15
  SHOW_PFLAGS    = 16
  SHOW_PRIOR     = 17

  #######################################################################
  # Redefine data path, for use in test tools

  def self.set_data_path( path )
    #bei Instanzen: self.class.send(:remove_const, 'VCF_PATH') if self.class.const_defined?(const)
    send(:remove_const, 'VCF_PATH')
    send(:remove_const, 'VCF_TEMP')
    const_set( :VCF_PATH, "#{path}/vcf")
    const_set( :VCF_TEMP, "#{path}/tmp")
  end

  #######################################################################
  # infile_name   : name of the file to open
  # tempfile      : location of the file for cp
  # fname         : filename for database (without .vcf)
  # login         : object of type Login
  # consent_given : type of consent (private, sharing, etc)
  # queue         : queue for job scheduling or nil for basic/prio
 
  def self.add_file( infile_name, tempfile, fname, login, consent_given, queue = nil )
    warnings = ""
    alerts = ""
    infile = File.open( infile_name )
    l = infile.first
    if l !~ /##fileformat=VCF/i
      alerts << "File #{fname}: Not a VCF file (invalid file format in header) \n"
      return nil, warnings, alerts
    end
    ref_found = false
    sample_names = ''
    infile.each do |line|
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

    infile.close

    fname.gsub!(/[^\w\.\-]/,'_')
    path = VcfFile.vcf_to_path( login.username, fname )
    if File.exist?( path )
      alerts << "File #{fname}: File aready exists \n"
      return nil, warnings, alerts
    end

    ## data = params[:upload]['datafile'].read
    # write the file
    # File.open(path, "wb") { |f| f.write( data ) }
    vcf_file = VcfFile.new( :name => fname,
                            :scanned => false,
                            :filtered => false,
                            :sample_names => sample_names,
                            :consent => :consent_given,
                            :user_id => login.user_id );

    FileUtils.cp( tempfile, path )
    login.user.vcf_files << vcf_file;
    login.user.uploaded_count += 1
    login.user.save

    vcf_file.save
    vcf_file.reload

    Delayed::Job.enqueue( PreprocJob.new( vcf_file.id, login.user_id ), :queue => queue || ( vcf_file.is_premium?( login ) ? 'prio' : 'basic' ) )

    return vcf_file, warnings, alerts
  end

  #######################################################################
  # @TODO: Refactor in ruby1.9 using map.with_index

  def self.create_empty_ped_array( id, sample_names = ['Sample'] )
    lines = []
    sample_names.each_with_index do |sample_name, i|
      lines << "#{sample_name},0,0,0,0,#{id}##{i+1}"
    end
    lines.join("\t")
  end

  #######################################################################
  def self.create_ped_from_columns( label, father, mother, gender, aff, origin )
    ped_t = [label, father, mother, gender, aff, origin]
    create_ped_from_array( ped_t.transpose )
  end

  #######################################################################
  def self.create_ped_from_array( ped )
    ped.map { |line| line.join(',') }.join("\t")
  end

  #######################################################################
  # @Todo: refactor, what's that good for?
  def self.vcf_to_path( username, filename )
    Rails.root.join( VCF_PATH, username + '_' + filename )
  end


  #######################################################################
  #
  def self.generate_output_filename( infile, sample=nil, current=-1, mask='*_%_filtered.vcf', keep_path=true)
    sample.gsub!( /[^\w\.\-]/, '' ) if sample.present?
    out = mask.dup
    out.gsub!( /\*/, infile.sub(/(\.vcf)?$/, '') )
    if sample.blank?
      out.gsub!( /_?\%/, '' )
    else
      out.gsub!( /\%/, sample )
    end
    out.gsub!( /\#/, current.to_s )
    out.gsub!( /[^\w\.\-\/]/, '_' )
    out.gsub!( /\//, '_' ) unless keep_path
    return out
  end


  #######################################################################
  #######################################################################

  #######################################################################
  def create_tabix
    vcf_fullname = self.fullpath
    gzfilename = "#{vcf_fullname}.gz"
    %x@#{Rails.root}/bin/bgzip -c -f "#{vcf_fullname}" > "#{gzfilename}"@
    %x@#{Rails.root}/bin/tabix -f -p vcf "#{gzfilename}"@
  end

  #######################################################################
  def is_premium?( login = nil )
     return AccessTools::user_has_license?( login )
  end

  #######################################################################
  def vcf_path
     File.join( Rails.root, VCF_PATH )
  end

  #######################################################################
  def fullname
    if self.user != nil
       File.join( VCF_PATH, "#{self.user.username}_#{self.name}" )
    else
       File.join( VCF_PATH, "__#{self.name}" )
    end
  end

  #######################################################################
  def fullpath
    if self.user != nil
       File.join( Rails.root, VCF_PATH, "#{self.login.username}_#{self.name}" )
    else
       File.join( Rails.root, VCF_PATH, "__#{self.name}" )
    end
  end

  #######################################################################
  def similarity_name
    return "#{self.name}_QualityReport.pdf"
  end

  #######################################################################
  def similarity_fullname
    owner = Login.find_by_id( self.user_id )
    if owner.blank?
       File.join( Rails.root, VCF_PATH, "__#{self.name}_QualityReport.pdf" )
    end
    File.join( Rails.root, VCF_PATH, "#{owner.username}_#{self.name}_QualityReport.pdf" )
  end

  #######################################################################
  def user_file_name
    owner = Login.find_by_id( self.user_id )
    if owner != nil
       File.join( owner.username + '_' + self.name )
    else
       File.join( '__' + self.name )
    end
  end

  #######################################################################
  def share( login )
    self.users << login.user
  end

  #######################################################################
  def exclusive( &block )
    #self.reload
    #while self.locked do
    #   sleep 10
    #   self.reload
    #end
    #self.locked = true
    self.save
    begin
      yield
    ensure
      #self.locked = false
      self.save
    end
  end


  #######################################################################
  def get_lines
    if self.lines.blank? || self.lines == 0
       self.lines = %x@cat "#{self.fullpath}" | grep -P "^(chr)?(\\d+|X|Y|M|MT|x|y|m|mt)\\t" | wc @.split.first.to_i
       self.save
    end
    return self.lines
  end

  #######################################################################
  def count_comment_lines
    %x@cat "#{self.fullpath}" | grep "^#" | wc @.split.first.to_i
  end

  #######################################################################
  # @TODO: Refactor

  def number_of_individuals
    return number_of_samples
  end

  #######################################################################
  def number_of_samples
    if self.sample_names.blank?
       return 1
    end
    return self.sample_names.split("\t").length
  end

  #######################################################################
  def copy_attributes( vcf_file, from = 0, to = -1 )
    self.preprocessors = vcf_file.preprocessors

    if vcf_file.ped.present?
      t = vcf_file.ped_array[from..to]
      if ( from != 0 || to != -1 )
        t.map!{ |x| x[VcfFile::PED_COL_FATHER] = 0; x[VcfFile::PED_COL_MOTHER] = 0; x }
      end
      self.set_ped_from_array( t ) if t.present?
    end
    if vcf_file.sample_links.present?
      t = vcf_file.sample_links.split(';')[from..to]
      self.sample_links = t.present? ? t.join(';') : ''
    end
    if vcf_file.blood_types.present?
      t = vcf_file.blood_types.split("\t")[from..to]
      self.blood_types   = t.present? ? t.join("\t") : ''
    end
    if vcf_file.gender.present?
      t = vcf_file.gender.split("\t")[from..to]
      self.gender        = t.present? ? t.join("\t") : ''
    end
    if self.sample_names.blank? && vcf_file.sample_names.present?
       t = vcf_file.sample_names.split("\t")[from..to]
       self.sample_names   = t.present? ? t.join("\t") : ''
    end
    if vcf_file.samples.present?
      vcf_file.samples.each do |p|
         self.samples << p if self.sample_links_array.include?( p.id ) unless self.sample_links.blank?
      end
    end
    self.save
  end

  #######################################################################
  def ped_array
    return nil if self.ped.blank?
    self.ped.split("\t").map { |line| line.split(',', -1).each_with_index.map { |x,i| (x  =~ /^\d+$/ && i > 0) ? x.to_i : x}}
  end

  #######################################################################
  def set_ped_from_columns( label, father, mother, gender, aff, origin )
    self.ped = VcfFile.create_ped_from_columns( label, father, mother, gender, aff, origin )
  end

  #######################################################################
  def set_ped_from_array( ped )
    self.ped = VcfFile.create_ped_from_array( ped )
  end

  #######################################################################
  # preferred: set PED data from PED object
  def set_ped( ped )
    self.ped = ped.to_string( self.sample_names )
  end

  #######################################################################
  def get_individual( i )
    return '' if self.sample_names.blank?
    i -= 1 if i > 0
    return self.sample_names.split("\t")[ i ] || ''
  end

  #######################################################################
  # @TODO: Refactor
  # for 'backward compatibility'
  def individuals
    Rails.logger.error("Error: VCFFile::individuals called")
    return sample_names
  end

  #######################################################################
  # @TODO: Refactor
  # for 'backward compatibility'
  def individuals=(  names )
    Rails.logger.error("Error: VCFFile::individuals= called")
    self.sample_names = names
  end

  #######################################################################
  def sample_names_array
    return [ 'Sample' ] if self.sample_names.blank?
    return self.sample_names.split("\t")
  end

  #######################################################################
  # create a new sample record for each sample in the vcf file
  def create_samples
    links = []
    sample_names_array.each_with_index do |name, i|
      patient = Patient.where(case_id: name.to_i).first
      PatientsVcfFile.create( :patient_id    => patient.id,
                              :vcf_file_id   => self.id,
                              :name => name )
      links << 1
    end
    self.sample_links = links.join(';')
    self.save
  end

  #######################################################################
  def sample_links_array
    create_samples if self.sample_links.blank?
    return self.sample_links.split(";").map{ |s| s.to_i }
  end

  #######################################################################
  def samples_array
    # Sample.includes(:hpo_terms).find_all_by_id( pids )
    # Sample.includes(:hpo_terms).find( sample_links_array.reject{ |x| x < 1 }  )
    ids = sample_links_array.reject{ |x| x < 1 }
    Sample.includes(:hpo_terms).where( :id => ids ).order("field(id, #{ids.join(',')})")
  end

  #######################################################################
  def samples_ordered_array
    self.sample_connections.sort{ |a,b| a.sample_number <=> b.sample_number }.map{ |s| s.sample }
  end

  #######################################################################
  def each_sample( &block )
    samples_array.each do |sample|
        block.call( sample )
    end
  end

  #######################################################################
  def each_sample_with_index( &block )
    samples_array.each_with_index do |sample, i|
        block.call( sample, i )
    end
  end

  #######################################################################
  def each_sample_name
    sample_names_array.each do |name|
      block.call( name )
    end
  end

  #######################################################################
  def each_sample_name_with_index( &block )
    sample_names_array.each_with_index do |name, i|
      block.call( name, i )
    end
  end

  #######################################################################
  def filter( filtersettings, samples, login, output_filename, queue=nil )

    if samples == '*' && !self.ped.blank? && self.ped.split("\t").length > 1
       multi = true
       indiv = 0
#          return if abort_unlicensed_user( 'Filtering more than one sample', '(Select one sample from your file by clicking the + icon).' )
    else # single
       multi = false
       indiv = samples.to_i
       indiv -= 1 unless indiv == 0
    end

    vcf_filtered = login.user.vcf_files.find_by_name( output_filename )
    if vcf_filtered == nil
       vcf_filtered = VcfFile.new( :name => output_filename,
                                    :scanned => true,
                                    :user_id => login.user_id
                                  );
    else
       @current_login.user.vcf_files.delete( vcf_filtered )
    end
    vcf_filtered.ped           = self.ped
    vcf_filtered.parent_id     = self.id
    vcf_filtered.flags         = self.flags
    vcf_filtered.preprocessors = self.preprocessors
    vcf_filtered.filtered      = self.filtered + 1
    vcf_filtered.save

    process = FilterProgress.create( :vcf_id => self.id, :user_id => login.user_id )

    if login.id < 0
       begin
         warnings = FilterJob.new( filtersettings.to_params, self, vcf_filtered, process.id, indiv, multi, login ).perform
       rescue => ex
         flash[:alert] = ex.message
       ensure
         flash[ :warning ] = warnings unless warnings.blank?
         redirect_to '/vcf_file/' + vcf_filtered.id.to_s + ( @multi ? '/*' : '') + '/?page=1'
        return
       end
    else
       if is_premium?( login )
         job = Delayed::Job.enqueue( FilterJob.new( filtersettings.to_filter_params, self, vcf_filtered, process.id, indiv, multi, login ), :queue => 'prio' )
       else
         job = Delayed::Job.enqueue( FilterJob.new( filtersettings.to_filter_params, self, vcf_filtered, process.id, indiv, multi, login ), :queue => 'basic', :run_at => 1.minutes.from_now )
       end
    end
  end

end
