class ReviewController < ApplicationController

  def index
    @pos = params[:chr]
    @snp_id = params[:snp]
    @ref = params[:ref]
    @genotype = params[:genotype]
    @annotation = params[:hgvs]
    # dbSNP
    dbsnp_prefix = "https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs="
    if @snp_id != ""
      @dbsnp_url = dbsnp_prefix + @snp_id.split("rs")[1]
      @data = URI.parse(@dbsnp_url).read
      doc = Nokogiri::HTML(@data)
      @hgvs = doc.at_css('[id="HGVS Names"]')
    end
    
    # ExAC
    exac_prefix = "http://exac.hms.harvard.edu/rest/dbsnp/"
    @result_array = []
    if @snp_id != ""
      @exac_url = exac_prefix + @snp_id
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
