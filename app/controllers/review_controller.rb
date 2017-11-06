class ReviewController < ApplicationController

  def index
    @pos = params[:chr]
    @snp_id = params[:snp]
    @ref = params[:ref]
    @genotype = params[:genotype]
    @annotation = params[:hgvs]

    uri = URI.parse("http://www.mutationtaster.org/cgi-bin/MutationTaster/MT_ChrPos.cgi")
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
    request = Net::HTTP::Post.new(uri.request_uri)
    request.set_form_data(form_data)
    response = http.request(request)
    doc = Nokogiri::HTML(response.body.to_s)
    @mt_tables = doc.css("table")[1].css("tr")[1..-1]
    sum = doc.css("td").css("ul")
    if !sum.nil?
      @summary = sum
    end
  end
end
