require 'csv'
namespace :vcf do

  ANN_ALLEL = 0
  ANN_ANNOTATION = 1
  ANN_IMPACT = 2
  ANN_GENE_NAME = 3
  ANN_GENE_ID = 4
  ANN_FEATURE_TYPE = 5
  ANN_FEATURE_ID = 6
  ANN_TRANSCRIPT = 7
  ANN_RANK = 8
  ANN_HGVS_C = 9
  ANN_HGVS_P = 10

  def get_alt_genotype(format, gt)
    format_array = format.split(':')
    gt_idx = format_array.index('GT')

    gt = gt[0].split(':')[gt_idx][0...3]
    gt_array = []
    gt_alt = []
    if gt.include? '|'
      gt_array = gt.split('|')
    elsif gt.include? '/'
      gt_array = gt.split('/')
    end
    gt_array.each do |gt_tmp|
      gt_tmp = gt_tmp.to_i
      if gt_tmp != 0 and !gt_alt.include? (gt_tmp - 1)
        gt_alt.push(gt_tmp - 1)
      end
    end
    puts gt
    puts gt_alt
    return gt_alt, gt
  end

  desc "Reset dbSnp ID"
  task :store_dbsnp_hgvs => :environment do
    Dir.foreach('Data/vcf/') do |item|
      next if not item.end_with? 'vcf.gz' 
      cp('Data/vcf/' + item, item)
      f = item
      e=%x@/bin/gzip -d -f "#{f}"@
      f.sub!(/\.gz$/,'')
      infile = File.open( f )

      start_parsing = false
      infile.each do |line|
        line.chomp!
        if start_parsing == true
          chrom, pos, ident, ref, alt, qual, filter, info, format, *gt = line.split("\t");
          chrom_num = VcfTools.chrom_to_i(chrom)

          ##Skip the variant which is not in chr1-22 X,Y
          next if chrom_num == 0

          var_pos = Position.find_by(chr: chrom_num, pos: pos.to_i, reference_genome_id: 0)
          ## Pares GT 
          gt_alt, genotype = get_alt_genotype(format, gt)

          info_array = info.split(";")
          ann = ''
          info_array.each do |tmp|
            if tmp.include? "ANN="
              ann = tmp[4..-1]
            end
          end
          ann_array = ann.split(",").values_at(*gt_alt)
          
          alt = alt.split(",")
          
          ann_array.each_with_index do |ann, index|
            ann = ann.split("|")
            mut = Mutation.find_by(ref: ref, alt: alt[gt_alt[index]])
            mut_pos = MutationsPosition.find_by(mutation_id: mut.id, position_id: var_pos.id)

            hgvs = ann[ANN_FEATURE_ID] + ':' + ann[ANN_HGVS_C]
            MutationsHgvsCode.find_or_create_by(hgvs_code: hgvs, mutations_position_id: mut_pos.id)

            hgvs_p = ann[ANN_HGVS_P] 
            if (not hgvs_p.include?("%3D")) and (not hgvs_p.include?("p.?"))
              MutationsHgvsCode.find_or_create_by(hgvs_code: hgvs_p, mutations_position_id: mut_pos.id)
            end
            snps = ident.split(',')
            if snps[0] != '.'
              snps.each do |snp_id|
                snp = Dbsnp.find_or_create_by(snp_id:snp_id)
                ann_dbsnp = MutationsDbsnp.find_or_create_by(dbsnp_id:snp.id, mutations_position_id:mut_pos.id)
              end
            end

          end
        end
        if line =~ /^#chrom/i
           chrom, pos, ident, ref, alt, qual, filter, info, format, *gt = line.split("\t");
           sample_name = gt.join("\t")
           start_parsing = true
        end
      end
    end
  end
end
