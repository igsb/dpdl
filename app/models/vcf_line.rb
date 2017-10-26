class VcfLine < ApplicationRecord
  # just for debug purposes!
  attr_reader :data
  attr_reader :cov_ab
 
  ###########################################################################
  def initialize( line )
    @data = VcfTools::parse_vcf_line( line ) if line.present?
    @cov_ab = []
    @infohash = nil
  end
 
  ###########################################################################
  # Accessors to data in the VCF line  
  def chrom
    @data[:chrom]
  end
 
  def pos
    @data[:pos]
  end  
 
  def id
    @data[:id]
  end
 
  def ident
    @data[:id]
  end
 
  def ref
    @data[:ref]
  end
 
  def alt
    @data[:alt]
  end
 
  def qual
    @data[:qual]
  end
 
  def filter
    @data[:filter]
  end
 
  def info
    puts @data[:info]
    @data[:info]
  end
 
  def format
    @data[:format]
  end
 
  def sample( idx )
    @data[:samples][idx] if @data[:samples]
  end
 
  ###########################################################################
  # First and second allele A1/A2 (alphabetically ordered) and alt allele   
  def first_allele( idx )
    @data[:samples][idx][:_][:al][0]
  end
 
  def second_allele( idx )
    @data[:samples][idx][:_][:al][1]
  end
 
  def alt_allele( idx )
    @data[:samples][idx][:_][:aa]
  end
 
  ###########################################################################
  # Get number, coverage and allelic balance (num, cov, ab) for sample idx
  def coverage( idx )
    if @cov_ab[ idx ] == nil
       @cov_ab[ idx ] = VcfTools.get_coverage( @data[:info], @data[:samples][idx] )
    end
    return @cov_ab[ idx ]
  end
 
  ###########################################################################
  # Get gene names from HGVS data
  def genes()
    puts 'vcf_life gene'
    return nil if @data[:info].blank?
    return nil if @data[:info][:ann].blank?
    #return nil if @data[:info][:hgvs].blank?
    VcfTools.get_genes_from_ann( @data[:info][:ann] )
  end
 
  ###########################################################################
  # Iterate over each sample  
  def each_sample( &block )
    @data[:samples].each do |sample|
      block.call( sample )
    end
  end                  
 
  ###########################################################################
  # Iterate over each sample  
  def each_sample_with_index( &block )
    @data[:samples].each_with_index do |sample, i|
      block.call( sample,i )
    end
  end      
end
