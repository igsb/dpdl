class SimilarityJob

  JAVA           = '/usr/bin/java'
  BED_DIR        = '/usr/bin/'
  RSCRIPT        = '/usr/bin/Rscript'
  SIMILARITY_DIR = '/opt/genetalk/addons/similarity/'
  SIMILARITY_JAR = 'VCF2Sim.jar' 

  CONSENSUS_FILE = '/opt/genetalk/data/consensus/consensus.bed'
  
  LOG_FILE       = '/opt/genetalk/logs/similarity.log'

  LPATH          = '/opt/genetalk/addons/similarity/LATEX/'
  LTEMPLATE      = 'f2greport.tex'


  DESIRED = {
               'ti/' => [2.7, 3.6],
               'Per' => [0.9, 1.0],
               'var' => [0.016, 0.23],
               'Non' => [0.8, 1.0],
               'het' => [1.3, 2.0],
               'SDS' => [1.0, Float::INFINITY]
            }

  require 'logger.rb'
  require 'fileutils.rb'
  require 'csv.rb'

  #===========================================================================
  def initialize( vcf_file, output_file = nil )
    if output_file == nil 
       @output_file = vcf_file + '_QualityReport.pdf'
    else
       @output_file = output_file
    end

    @vcf_file = vcf_file

    @logger = Logger.new(LOG_FILE, 10, 1024000)
    @logger.sev_threshold = Logger::INFO
  end

  #===========================================================================
  def run()
    
    @logger.info "Starting SimilarityJob on #{@vcf_file}"

    throw_error("File not found: #{@vcf_file}") if ! File.file?( @vcf_file )

    vcf_tmpdir = "/tmp/#{File.basename(@vcf_file)}_sim_tmp/"
    pdf_output = "#{vcf_tmpdir}/QualityReport.pdf"
    table_file = "#{vcf_tmpdir}/QualityReport_table.txt"

    passed = true

    ok = run_similarity(vcf_tmpdir, pdf_output)

    if ok 
       passed = check_values( table_file )
       FileUtils.mv( pdf_output, @output_file, :force => true )
    else 
       passed = false 
       @output_file = nil
    end
    
    @logger.info "Finished SimilarityJob on #{@vcf_file}"

    return passed, @output_file

  end

private

  #===========================================================================
  def run_similarity(vcf_tmpdir, pdf_output)

    FileUtils.mkdir vcf_tmpdir unless File.directory? vcf_tmpdir

    vcf_tmpfile = "#{vcf_tmpdir}/#{File.basename(@vcf_file)}"

    @logger.info "...Starting BED on #{@vcf_file}"
    %x@(#{BED_DIR}/intersectBed -a "#{@vcf_file}" -b #{CONSENSUS_FILE} | grep -v "^#" >> "#{vcf_tmpfile}") 2>> #{LOG_FILE} @

    lines = %x@cat "#{vcf_tmpfile}" | wc @.split.first.to_i
    
    if lines > 9999

      @logger.info "...Starting Java on #{@vcf_file}"

      err = %x@(cd #{SIMILARITY_DIR}; #{JAVA} -Xmx2g -jar VCF2Sim.jar -d "#{vcf_tmpdir}/" -o similarity.txt 2>&1 >> #{LOG_FILE} )@
      throw_error( "An error occured while processing your file #{@vcf_file}... #{$?.exitstatus}, #{err}" ) if $? != 0

      @logger.info "...Starting R on #{@vcf_file}"
      err = %x@(cd #{SIMILARITY_DIR}; #{RSCRIPT} --verbose --vanilla R/MDS.R -i "#{vcf_tmpdir}/similarity.txt" -o "#{pdf_output}" -p "#{LPATH}" -t "#{LTEMPLATE}" 2>&1 >> #{LOG_FILE} )@
      throw_error( "An error occured while processing your file #{@vcf_file}.... #{$?.exitstatus}, #{err}" ) if $? != 0

      return true

    else

      @logger.info "Abort SimilarityJob on #{@vcf_file}: only #{lines} variants"
      # raise "Sorry, your VCF file is too short for quality assessment"

      return false

    end

  end

  #===========================================================================
  def check_values( file )
    passed = true

    CSV.foreach( file, :col_sep => "\t" ) do |row|
      target = DESIRED[row[0][0..2]]
      if target != nil
        it = row.each
        it.next 
        loop do
          val = it.next.to_f
          ok = (val > target[0] && val < target[1])
          passed = false unless ok
          # puts "#{row[0]}: #{target[0]} > #{val} < #{target[1]} -> #{ok ? "ok" : "NOT OK"}"
        end # loop
      end # if
    end # CSV

    return passed

  end

  #===========================================================================
  def cleanup()
  end

  #===========================================================================
  def throw_error( s )
    @logger.fatal "Abort SimilarityJob on #{@vcf_file}: #{s}"
    raise s
  end
  
end
