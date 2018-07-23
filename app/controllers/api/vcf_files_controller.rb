class Api::VcfFilesController < Api::BaseController
  before_action :authenticate_token

  # POST /vcf_files
  def create
    fname = File.basename( params[:file].original_filename)
    warnings = ""
    alerts = ""
    ActiveRecord::Base.transaction do
      if fname =~ /zip$/  
        tdir = File.join( VcfFile::VCF_PATH, fname )
        zipfile = params[:file].tempfile.path
        FileUtils.rmtree( tdir )    
        Dir.mkdir( tdir, 0700 )
        %x@unzip -aa -j "#{zipfile}" -d "#{tdir}"@ 
        files = Dir.glob( File.join(tdir, "**") )
        output = "#{tdir} \n\n"
        files.each do |f|                                      
          infile = File.open( f )
          name = File::basename( f )
          @vcf_file, w, a = VcfFile.add_file( infile, f, name, nil )
          warnings << w
          warnings << a
        end
        FileUtils.rmtree( tdir )
      elsif fname =~ /gz$/ || fname =~ /txt$/  
        f = "#{Rails.root}/#{VcfFile::VCF_TEMP}#{fname}"
        FileUtils.cp( params[:file].tempfile.path, f )
        e=%x@/bin/gzip -d -f "#{f}"@
        f.sub!(/\.gz$/,'')
        infile = File.open( f )
        name = File::basename( f )
        @vcf_file, warnings, alerts = VcfFile.add_file( infile, f, name, nil )
        FileUtils.rm_f f       
      else
        infile = params[:file].open   
        tempfile = params[:file].tempfile.path
        @vcf_file, warnings, alerts = VcfFile.add_file( infile, tempfile, fname, nil )
      end

      if @vcf_file == nil
        respond_to do |format|
          format.json { render plain: {error:warnings}.to_json, status: 400, content_type: 'application/json'}
        end
      else
        @vcf_file.create_samples
        @vcf_file.parse_vcf
        @vcf_file.create_tabix
        @vcf_file.name = @vcf_file.name + '.gz'
        @vcf_file.save
        respond_to do |format|
          format.json { render plain: {msg:"VCF file uploaded successfully.PEDIA workflow triggered."}.to_json, status: 200, content_type: 'application/json'}
        end
      end
    end
  end

  def authenticate_token
    token = ApiKey.where(access_token: params[:token]).first
    if token && !token.expired?

    else
      if token.expired?
        token.destroy
        respond_to do |format|
          format.json { render plain: {error:'token expired.'}.to_json, status: 401, content_type: 'application/json'}
        end
      else
        respond_to do |format|
          format.json { render plain: {error:'Invalid token.'}.to_json, status: 401, content_type: 'application/json'}
        end
      end
    end
  end
end
