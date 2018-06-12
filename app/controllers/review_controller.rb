class ReviewController < ApplicationController

  def index
    require "open-uri"
    require 'net/http'
    require 'uri'

    @pos = params[:chr]
    @snp_id = params[:snp]
    @ref = params[:ref]
    @genotype = params[:genotype]
    @annotation = params[:hgvs]
    
  end
  
  def get_review
    @pos = params[:chr]
    @snp_id = params[:snp]
    @ref = params[:ref]
    @genotype = params[:genotype]
    @annotation = params[:hgvs]
    parse_dbsnp()
    #parse_exac()
    parse_mut_taster()
    parse_ensembl()
    render :partial => "get_review"
  end

  def parse_dbsnp
    # dbSNP
    dbsnp_prefix = "https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs="
    @hgvs = []
    if @snp_id != ""
      @dbsnp_url = dbsnp_prefix + @snp_id.split("rs")[1]
      @data = URI.parse(@dbsnp_url).read
      doc = Nokogiri::HTML(@data)
      @hgvs = doc.at_css('[id="HGVS Names"]').css("li")
      @cli_sig = doc.at_css('[id="Allele"]').css("td")[-4..-3]
      @maf_title = doc.at_css('[id="Allele"]').css("td")[-2]
      @maf = doc.at_css('[id="Allele"]').css("td")[-1].css('span')
      puts @maf
    end
  end
  def parse_ensembl
    server = 'https://rest.ensembl.org'
    path =  '/variation/human/' + @snp_id + '?'
    url = URI.parse(server)
    http = Net::HTTP.new(url.host, url.port)

    http.use_ssl = true
    request = Net::HTTP::Get.new(path, {'Content-Type' => 'application/json'})


    @ensembl_valid = false
    if @snp_id != ''
      res = http.request(request)
      if response.code != "200"
        puts "Invalid response: #{response.code}"
        puts response.body
        exit
      else
        @ensembl_valid = true
        result = JSON.parse(res.body)
        @most_severe = result['most_severe_consequence']
        @evidence = result['evidence']
        if @evidence.nil?
          @evidence = []
        end
        @ensembl_clinical_sig = result['clinical_significance']
        if @ensembl_clinical_sig.nil?
          @ensembl_clinical_sig = []
        end
        @ensembl_maf = result['MAF']
        @ensembl_location = []
        location_array = result['mappings']
        location_array.each do |location|
          allele_string = location['allele_string'].split('/')
          ref = allele_string[0]
          alt = allele_string[1..-1].join('/')
          value = {'location' => location['location'], 'assembly_name' => location['assembly_name'], 'ref' => ref, 'alt' => alt}
          @ensembl_location.push(value)
        end
      end
    end
  end

  def parse_exac
    # ExAC
    # The first one is for REST, and the second one is for navigating to the website
    exac_prefix = "http://exac.hms.harvard.edu/rest/"
    link_prefix = "http://exac.broadinstitute.org/dbsnp/"

    pos = @pos.split(':')

    # Parse genotype
    genotype = []
    if @genotype.include? "|"
      genotype = @genotype.split("|")
    end
    if @genotype.include? "/"
      genotype = @genotype.split("/")
    end
    alt = ''
    genotype.each do |value|
      if value != @ref
        alt =value 
      end
    end

    # Send request by position to ExAC 
    exac_pos_url = exac_prefix + 'variant/'+ pos[0] + '-' + pos[1] + '-' + @ref + '-' + alt
    pos_prefix = "http://exac.broadinstitute.org/variant/"
    @exac_pos_link_url = pos_prefix + pos[0] + '-' + pos[1] + '-' + @ref + '-' + alt
    puts(@exac_pos_link_url)
    url = URI.parse(exac_pos_url)
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    result = JSON.parse(res.body)['variant']
    @pos_result_array = []
    tmp = []
    var_id = result['variant_id']

    # @exac_pos_valid is for detecting if the mutation exsits in ExAC
    @exac_pos_valid = true
    if var_id.nil?
      @exac_pos_valid = false
    else
      tmp.push(result['variant_id'])
      tmp.push(result['filter'])
      tmp.push(result['allele_count'])
      tmp.push(result['allele_num'])
      tmp.push(result['allele_freq'])
      @pos_result_array.push(tmp)
    end

    @result_array = []
    @exac_url = exac_prefix + 'dbsnp/'+ @snp_id
    @exac_link_url = link_prefix + @snp_id
    if @snp_id != ""
      url = URI.parse(@exac_url)
      req = Net::HTTP::Get.new(url.to_s)
      res = Net::HTTP.start(url.host, url.port) {|http|
        http.request(req)
      }
      result = JSON.parse(res.body)
      results = result['variants_in_region']
      results.each do |row|
        out = []
        tmp = row['variant_id']
        out.push(tmp)
        tmp = row['chrom']
        out.push(tmp)
        tmp = row['pos']
        out.push(tmp)
        tmp = row['HGVSp']
        out.push(tmp)
        tmp = row['filter']
        out.push(tmp)
        tmp = row['category']
        out.push(tmp)
        tmp = row['flag']
        out.push(tmp)
        tmp = row['allele_count']
        out.push(tmp)
        tmp = row['allele_num']
        out.push(tmp)
        tmp = row['hom_count']
        out.push(tmp)
        tmp = row['allele_freq']
        out.push(tmp)
        @result_array.push(out)
      end
    end
  end

  def parse_mut_taster
    # mutation taster
    mut_url_prefix = "http://www.mutationtaster.org/cgi-bin/MutationTaster/MT_ChrPos.cgi"
    uri = URI.parse(mut_url_prefix)
    http = Net::HTTP.new(uri.host, uri.port)

    genotype = @genotype.split("/")
    alt =  ""
    for g in genotype
      if g != @ref
        alt = g
      end
    end
    form_data = {
      "chromosome" => @pos.split(":")[0],
      "position" => @pos.split(":")[1],
      "ref" => @ref,
      "alt" => alt
    }
    @mut_taster_url = mut_url_prefix + '?chromosome=' + @pos.split(":")[0] + '&position=' + @pos.split(":")[1] + '&ref=' + @ref + '&alt=' + alt
    request = Net::HTTP::Post.new(uri.request_uri)
    request.set_form_data(form_data)
    response = http.request(request)
    doc = Nokogiri::HTML(response.body.to_s)
    @transcripts = []
    doc.css("small").each_with_index do |value, idx|
      if value.text.include? "MT speed"
        break
      end
      @transcripts.push(value.text)
    end
    @mt_tables = doc.css("table")[1].css("tr")[1..-1]
    sum = doc.css("td").css("ul")
    if !sum.nil?
      @summary = sum
    end
  end
end
