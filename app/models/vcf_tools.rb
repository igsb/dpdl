 ###########################################################################
 #
 # A collection of tools to parse data in a VCF file
 # should mainly be used by class VcfLine
 # (except for parsing Metadata)
 
 class VcfTools
 
  COVERAGE_FLAGS = [ :saf, :sar, :srf, :srr, :fsaf, :fsar, :fsrf, :fsrr, :dp, :ec, :ad, :dp4, :ao, :af ]
 
  GENOTYPES = ['AA','AC','AG','AT','CC','CG','CT','GG','GT','TT']
  LINE_FORMAT = ['chrom', 'pos', 'id', 'ref', 'alt', 'qual', 'filter', 'info', 'format']
  CHROM_LINE = '#' + LINE_FORMAT.map{ |x| x.upcase}.join("\t")
 
  VCF_CHROM_COLUMN  = 0
  VCF_POS_COLUMN    = 1
  VCF_ID_COLUMN     = 2
  VCF_REF_COLUMN    = 3
  VCF_ALT_COLUMN    = 4
  VCF_QUAL_COLUMN   = 5
  VCF_FILTER_COLUMN = 6
  VCF_INFO_COLUMN   = 7
  VCF_FORMAT_COLUMN = 8
 
  TEST_VCF_LINE1="1\t120458270\trs75831573\tG\tC\t.\tPASS\tEFFECT=missense;HGVS=NOTCH2:NM_024408:exon34:c.7075C>G:p.P2359\tGT:AO:DP\t0/1:167:246"
  TEST_VCF_LINE2="1\t12045827\trs75831573\tTAAA\tTA,A\t.\tPASS\tEFFECT=missense;HGVS=NOTCH2:NM_024408:exon34:c.7075C>G:p.P2359\tGT:AD\t1/2:30,42,59\t0/1:30,42,59\t1|2:10,20\t./.:0,0"
  TEST_VCF_LINE3="1\t12045827\trs75831573\tTAAA\tTA,A\t.\tPASS\tEFFECT=missense;HGVS=NOTCH2:NM_024408:exon34:c.7075C>G:p.P2359\tGT:AD:DP:GQ:PL\t0/1:35,42:93:99:1231,0,1051\t0/0:67,0:64:99:0,193,2553"
  TEST_VCF_LINE4="1\t120458270\trs75831573\tG\tC\t.\tPASS\tEFFECT=missense;HGVS=NOTCH2:NM_024408:exon34:c.7075C>G:p.P2359;AB=0.231707;ABP=54.2782;AC=1;AF=0.5\tGT:DP:RO:QR:AO:QA:GL\t0/1:82:63:2179:19:378:-9.53083,0,-171.639"
  TEST_VCF_LINE5="10\t89623860\trs71022512\tCT\tC\t100,00\tPASS\tEFFECT=UTR5;HGVS=PTEN(NM_000314:c.-366del-);DP=576;TI=NM_000314;GI=PTEN;FC=Noncoding;EXON\tGT:GQ:AD:VF:NL:SB:GQX\t0/1:100:94,482:0,8368:20:-100,0000:100"
 
  ###########################################################################
  # Return hash with the data of a variant line (as strings)
  # done: return info column as hash
  #       return samples as array of hashes of converted values
 
  def self.parse_vcf_line( line )
    num_keys = VcfTools::LINE_FORMAT.length
    values = line.split("\t")
    values << values.slice!( num_keys, values.length)
 
    values[ VCF_CHROM_COLUMN  ] = chrom_to_i( values[ VCF_CHROM_COLUMN ] )
    values[ VCF_POS_COLUMN    ] = convert_data( values[ VCF_POS_COLUMN ] )
    values[ VCF_ID_COLUMN     ] = convert_data( values[ VCF_ID_COLUMN  ] )
 #    values[ VCF_ALT_COLUMN    ] = convert_data( values[ VCF_ALT_COLUMN ] )
    values[ VCF_ALT_COLUMN    ] = get_allele_array( values[ VCF_REF_COLUMN ], values[ VCF_ALT_COLUMN ] )
    values[ VCF_QUAL_COLUMN   ] = convert_data( values[ VCF_QUAL_COLUMN ] )
    values[ VCF_INFO_COLUMN   ] = parse_info( values[VCF_INFO_COLUMN] )
 
    values[num_keys].map!{ |x| parse_sample( values[VCF_FORMAT_COLUMN], x, values[VCF_ALT_COLUMN].length, values[ VCF_ALT_COLUMN ] ) } unless values[num_keys].blank?
 
    values[ VCF_FORMAT_COLUMN ] = values[VCF_FORMAT_COLUMN].split(':') unless values[VCF_FORMAT_COLUMN].blank?
 
    labels = (LINE_FORMAT.dup + ['samples']).map{ |x| x.to_sym }
    Hash[ labels.zip( values )]
 
  end
 
  ###########################################################################
  # Return tag and data (hash, string or nil) of a metadata line
 
  def self.parse_metadata( line, flat = false )
    line ||= ''
    line.gsub!(/(\([^,)]+),([^)]+\))/, "\\1@_@_@\\2") while line =~ /\([^,)]+,[^)]+\)/
    line.gsub!(/(=\s*"[^,"]+),([^"]+")/, "\\1@@@\\2") while line =~ /(=\s*"[^,"]+),([^"]+")/
    if line =~ /##([^=]*)\s*=\s*<([^>]*)>/
       tagstr = Regexp.last_match(1)
       data= Regexp.last_match(2)
       tag = tagstr.downcase.gsub(/\s+/, "").to_sym
       h = {}
       if data
          h = Hash[data.split(/\s*,\s*/).map{ |p| p.gsub(/"/, '').gsub(/@@@/, ',').split('=') }.map do |x|
            raise "Malformatted metadata line: #{line}" if x.length > 2
            x[0] = x[0].downcase.gsub(/\s+/, "").to_sym
            x[1] = x[1] != nil ? convert_data( x[1].strip, false, flat ) : nil
            x
          end ]
       end
       return tag, h
    elsif line =~ /##([^=]*)\s*=\s*"([^"]*)"/
      tagstr = Regexp.last_match(1)
      data= Regexp.last_match(2)
      tag = tagstr.downcase.gsub(/\s+/, "").to_sym
      return tag, data
    else
      line =~ /##([^=]*)/
      return Regexp.last_match(1).downcase.gsub(/\s+/, "").to_sym, nil
    end
  end
 
  ###########################################################################
  # Return hash of sample flags, values are strings
  # @TODO: RETURN HASH WITH SYMBOLS AS KEYS (downcase)
 
  def self.parse_sample_flags( format, sample )
    format ||= []
    sample ||= []
    labels = format.split(':')
    values = sample.split(':')
    Hash[ labels.zip(values) ]
  end
 
  ###########################################################################
  # Return hash of sample flags, values are parsed
 
  def self.parse_sample( format, sample, uncalled_default = '.', alt_alleles = nil )
     sample_hash = parse_sample_flags( format, sample )
     #sample_hash.update( sample_hash ){ |k,v| convert_data( v )}
     result = Hash[ sample_hash.map{ |k,v| [k.downcase.to_sym, convert_data( v )] } ] || {}
     result[:_] = {}
     result[:_][:idx] = [uncalled_default, uncalled_default]
     result[:_][:al] = ['.', '.']
     if ( result.has_key?( :gt ) )
        if result[:gt] =~ /(\d|\.)[\/|](\d|\.)/
           result[:_][ :idx ] = [convert_data( Regexp.last_match[1] ), convert_data( Regexp.last_match[2] )]
        end
     end
     if alt_alleles != nil
       f, s, a = get_alleles_from_array( result[:gt], alt_alleles )
       result[:_][:al][0] = f
       result[:_][:al][1] = s
       result[:_][:aa] = a
     end
     return result
  end
 
  ###########################################################################
  # Parse INFO Column: return hash of entries in the info column
  # @TODO: RETURN HASH WITH SYMBOLS AS KEYS (downcase)
 
  def self.parse_info( infocolumn )
    out = {}
    infocolumn.split(';').each do |s|
    k,v = s.split('=')
    out[k.downcase.to_sym] = v
    end
    return out
  end
 
  ###########################################################################
  def self.parse_sample_names( chrom_line )
    chrom_line.split("\t").slice( LINE_FORMAT.length..-1 )
  end
 
  ###########################################################################
  # Get Coverage Flags from GeneType Data or Info Column
 
  def self.get_coverage_flags( info_hash, sample_hash )
    cov_hash = {}
    COVERAGE_FLAGS.each do |flag|
      if sample_hash.key?( flag )
        cov_hash[ flag ] = sample_hash[ flag ]
      elsif info_hash.key?( flag )
        cov_hash[ flag ] = convert_data( info_hash[ flag ] )
      end
    end
    return cov_hash
  end
 
  ###########################################################################
  def self.get_coverage( info_hash, sample_hash )
     cov_hash = get_coverage_flags( info_hash, sample_hash )
 
     num = nil
     cov = nil
     ab = nil
 
     ### initialize cov
     if cov_hash.has_key?( :ad )
        cov = get_value( cov_hash[:ad] )
     elsif cov_hash.has_key?( :dp )
        cov = get_value( cov_hash[:dp] )
     elsif cov_hash.has_key?( :dp4 )
        cov = get_value( cov_hash[:dp4] )
     elsif cov_hash.has_key?( :saf )
        cov = get_value( cov_hash[:saf] ) + get_value( cov_hash[:sar] ) + get_value( cov_hash[:srf] ) + get_value( cov_hash[:srr] )
     elsif cov_hash.has_key?( :fsaf )
        cov = get_value( cov_hash[:fsaf] ) + get_value( cov_hash[:fsar] ) + get_value( cov_hash[:fsrf] ) + get_value( cov_hash[:fsrr] )
     end
 
     ### initialize num
     if cov_hash.has_key?( :ao )
        if cov_hash[:ao].is_a?(Array)
           num = cov_hash[:ao][0]
        else
           num = cov_hash[:ao]
        end
     elsif cov_hash.has_key?( :ad ) && cov_hash[:ad].is_a?(Array)
        idx1 = sample_hash[:_][:idx][0]
        idx2 = sample_hash[:_][:idx][1]
        if idx1 != '.' and idx2 != '.' and cov_hash[ :ad ][idx1].present? and cov_hash[ :ad ][idx2].present?
           ad1 = cov_hash[ :ad ][idx1]
           ad2 = cov_hash[ :ad ][idx2]
           if ( idx1 == 0 )
              num = ad2
           elsif ( idx2 == 0 )
              num = ad1
           else
              num = [ad1, ad2].min
           end
        end
     elsif cov_hash.has_key?( :ec )
        if cov_hash[:ec].is_a?(Array)
           num = cov_hash[:ec][0]
        else
           num = cov_hash[:ec]
        end
     end
 
     ### initialize ab
     if sample_hash.has_key?( :af )
        ab  = get_value( sample_hash[:af] )
     elsif num != nil and cov != nil and cov != 0.0
        ab = 1.0 * num / cov
     elsif info_hash.has_key?( :af )
        ab  = get_value( info_hash[:af] )
     end
 
     return num, cov, ab
  end
 
  ###########################################################################
  # Get Coverage Flags from GeneType Data or Info Column as string
 
  def self.get_coverage_string( info_hash, sample_hash )
    get_coverage_flags( info_hash, sample_hash ).map{ |e| e.join('=') }.join(',')
  end
 
  ###########################################################################
  # Get Genes from HGVS entry
 
  def self.get_genes_from_hgvs( hgvs )
    genes = []
    # hgvs =~ /^([\w,-]+)[;:\(]/
    temp = hgvs.sub(/\([^\)]*\)/, '')
    temp =~ /^([\w,-]+)/
    matches = Regexp.last_match(1)
    genes = matches.split(',') unless matches.blank?
    return genes
  end
 
  def self.get_genes_from_ann( ann )
    genes = []
    genes.push(ann.split("|")[3])
    return genes
  end
  ###########################################################################
  # "Decode" Genotypes
  # get_alleles( 'T', 'C,G', ['0/1', '0/2', '1/2'] ) => ['C', 'G', 'C'],['T', 'T', 'G']
 
  def self.get_alleles( ref, alt, gtypes )
    ref.upcase!
    alt.upcase!
 
    first = []
    second = []
    alleles = alt.split(',')
    alleles.unshift( ref )
 
    gtypes.each do |gt|
      if gt =~ /(\d)[\/|](\d)/
         nfirst = Regexp.last_match[1].to_i
         nsec =  Regexp.last_match[2].to_i
         afirst = alleles[ nfirst ]
         asec = alleles[ nsec ]
         afirst = '?' if afirst.blank?
         asec = '?' if asec.blank?
      else
         afirst = '.'
         asec = '.'
      end
      afirst,asec = asec,afirst if afirst > asec && afirst.length == 1 && asec.length == 1
      first << afirst
      second << asec
    end
 
    return first, second
  end
 
  ###########################################################################
  # return a list of heterozygeous genotypes in canonical order
 
  def self.create_genotypes( len=1 )
    return 0.upto( len ).map{ |i| (i+1).upto( len ).map{ |j| "#{i}/#{j}"}}.flatten
  end
 
  ###########################################################################
  # Return array of alleles from ref and alt columns for gt_to_allele
 
  def self.get_allele_array( ref, alt )
    alleles = alt.split(',')
    alleles.unshift( ref )
 
    return alleles
  end
 
  ###########################################################################
  # Convert Genotype (0/1) to alleles (G/T, return first, second and alt allele)
  # input: genotype and array of alleles
 
  def self.get_alleles_from_array( gt, alleles )
    first = '.'
    second = '.'
    alt = '.'
    if gt =~ /(\d)[\/|](\d)/
       nfirst = Regexp.last_match[1].to_i
       nsecond =  Regexp.last_match[2].to_i
       first = alleles[ nfirst ]
       second = alleles[ nsecond ]
       first = '?' if first.blank?
       second = '?' if second.blank?
 
       alt = second.dup if nsecond != 0
       alt = first.dup if nfirst != 0
 
       first.upcase!
       second.upcase!
 
       first, second = second, first if first.length == 1 && second.length == 1 && first > second
    end
 
    return first, second, alt
 
  end
 
  ###########################################################################
  def self.normalize_genotype( gt )
    if gt.upcase =~ ( /([^\/\|]+)([\/\|])([^\/\|]+)/ )
       r1 = Regexp.last_match[1]
       r2 = Regexp.last_match[2]
       r3 = Regexp.last_match[3]
       if ( r3 < r1 ) && r3.length == 1 && r2.length == 1
          return "#{r3}#{r2}#{r1}"
       else
          return "#{r1}#{r2}#{r3}"
       end
    end
    return gt
  end
 
  ###########################################################################
  def self.chrom_to_i( chrom )
    raise "Invalid VCF file: no chromosome" if chrom == nil
    chrom.sub!(/^chr/i, '')
    chrom =~ /^(\d+|X|Y|MT|M)$/i
    raise "Invalid VCF file #{chrom} " if Regexp.last_match == nil
    chrom = Regexp.last_match[1]
    chrom.sub!(/X/i, '23')
    chrom.sub!(/Y/i, '24')
    chrom.sub!(/M/i, '25')
    return chrom.to_i
  end
 
  #######################################################################
  def self.chrom_to_s( chrom )
    case chrom
      when 23 then 'X';
      when 24 then 'Y';
      when 25 then 'M'
      when '23' then 'X';
      when '24' then 'Y';
      when '25' then 'M'
      else chrom.to_s;
    end
  end
 
  ###########################################################################
  def self.indiv_name( line, number )
    spl = line.split("\t")
    indiv = spl[ 9 + number ]
    indiv = "Individual" + number.to_s if indiv.blank?
    return indiv
  end
 
  ###########################################################################
  def self.indiv_names( line, from, to )
    spl = line.split("\t")
    return spl.slice((9+from)..(9+to))
  end
 
  ###########################################################################
  def self.ped_origin( str )
    str =~ /(\d+)\#?(\d+)?/
    vcf_id  = Regexp.last_match(1)
    indiv = Regexp.last_match(2)
    vcf_file = VcfFile.find_by_id( vcf_id.to_i )
    return '' if vcf_file.blank?
    indiv_name = indiv.blank? ? '' : vcf_file.get_individual( indiv.to_i )
    return "#{vcf_file.name} (#{indiv_name})"
  end
 
  ###########################################################################
  def self.split_hgvs( str_in )
    return "", "", "" if str_in.blank?
    str = str_in.dup
    protein = []
    str =~ /^([\w,]+)[;:\(]/
    gen = Regexp.last_match(1)
    str.gsub!(/#{gen}[;:]*/, '')
    while str =~ /(p.[^:,;]*)/ do
      t = Regexp.last_match(1)
      str.gsub!(/#{t}[:,;]*/, '')
      protein << t
    end
 
    return gen, str, protein.join(',')
  end
 
  ###########################################################################
  def self.write_header( chrom_line = nil, out = $stdout )
    chrom_line ||= CHROM_LINE
    out.puts <<
 ##fileformat=VCFv4.1
 ##reference=hg19
 EOF
    out.puts chrom_line
  end
 
 
  ###########################################################################
  def self.get_value( int_or_array )
    if int_or_array.is_a?(Numeric)
       return int_or_array
    elsif int_or_array.is_a?(Array)
       return int_or_array.reduce(0,:+)
    elsif int_or_array.to_f.is_a?(Numeric)
       return int_or_array.to_f
    else      
       return 0
    end
  end
 
  ###########################################################################
  def self.convert_data( x, convert_symbol = false, flat = false)
    return x if x.blank?
    return x.split(',').map{ |x| convert_data(x.strip, convert_symbol ) } if x =~ /,/ and !flat
    i = x.to_i
    return i if i.to_s == x
    i = x.to_f
    return i if i.to_s == x
    return true if x.upcase == "TRUE"
    return false if x.upcase == "FALSE"
    x.gsub!(/@_@_@/, ',') if x.is_a?( String )
    x = x.downcase.to_sym if x.is_a?( String ) and convert_symbol
    return x
  end
 
  ###########################################################################
  def self.sanitize_filename( file )
     return file.gsub(/[^\w\.-]+/,'_').gsub(/\.(?!vcf|gz|zip)/, '_')
  end
 
 end
