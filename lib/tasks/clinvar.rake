require 'csv'
namespace :bootstrap do
  desc "Import clinvar"
  task :prep_clinvar => :environment do
    @@log = Logger.new('log/bootstrap_clinvar.log')
    require "csv"
    count = 0
    filename = "Data/clinvar/072018/clinvar_20180701.vcf.gz"
    var_dict = {}
    Zlib::GzipReader.open(filename) do |gzip|
      csv = CSV.new(gzip, {headers: :first_row, col_sep: "\t"})
      csv.each do |row|
        hgvs = ''
        omim = ''
        gene = ''
        var_id = row['ID']
        pos = row['POS']
        chr = row['#CHROM']
        ref = row['REF']
        alt = row['ALT']
        info_array = row['INFO'].split(';')
        info_array.each do |info|
          if info.include?('CLNDISDB')
            tmp_array = info.split(',')
            tmp_array.each do |tmp|
              if tmp.include?('OMIM')
                omim = tmp[5..-1]
              end
            end
          elsif info.include?('GENEINFO')
            gene = info.split(':')[1]
          elsif info.include?('CLNHGVS')
            hgvs = info.split('=')[1]
          end
        end
        if var_dict.key?(var_id)
          @@log.debug "Variant ID already existed: #{var_id}"
        end
        var_dict[var_id] = {:chr => chr, :pos => pos, :ref => ref, :alt => alt, :hgvs => hgvs, :omim => omim, :gene => gene}
      end
    end

    count = 0
    filename = "Data/clinvar/072018/submission_summary.txt.gz"
    sub_array = []
    Zlib::GzipWriter.open("Data/clinvar/072018/clinvar_072018_final.csv.gz") do |gzout|
      csv_out = CSV.new(gzout)
      csv_out << ["scv", "var_id, ""chr", "pos", "ref", "alt", "significance", "status", "date", "hgvs", "gene", "omim"]
      Zlib::GzipReader.open(filename) do |gzip|
        csv = CSV.new(gzip, {headers: :first_row, col_sep: "\t", liberal_parsing: true})
        csv.each do |row|
          sig = row['ClinicalSignificance']
          var_id = row['#VariationID']
          date = row['DateLastEvaluated']
          status = row['ReviewStatus']
          sub = row['SCV']
          var = var_dict[var_id]
          if sub_array.include?(sub)
            @@log.debug "Submission already existed: #{sub}"
          end
          sub_array << sub
          if var_dict.key?(var_id)
            csv_out << [sub, var_id, var[:chr], var[:pos], var[:ref], var[:alt], sig, status, date, var[:hgvs], var[:gene], var[:omim]]
          end
        end
      end
    end
    @@log.info "Clinvar preprocess completed"
  end

  desc "Import clinvar"
  task :import_clinvar => :environment do
    count = 0
    @@log = Logger.new('log/bootstrap_clinvar.log')
    filename = "Data/clinvar/072018/clinvar_072018_final.csv.gz"
    version = '01072018'
    sub = User.find_or_create_by(username: 'Clinvar')
    Zlib::GzipReader.open(filename) do |gzip|
      csv = CSV.new(gzip, {headers: true, col_sep: ","})
      csv.each do |row|
        sig = row['significance']
        var_id = row['var_id']
        chr = row['chr']
        pos = row['pos']
        ref = row['ref']
        alt = row['alt']
        status = row['status']
        hgvs = row['hgvs']
        gene = row['gene']
        scv = row['scv']
        genotype = ref + '/' + alt
        omim_tmp = row['omim']
        # Skip the variant which is not in chr1-22 X, Y
        chr.sub!(/^chr/i, '')
        chr =~ /^(\d+|X|Y|MT|M)$/i
        next if Regexp.last_match == nil

        chrom = VcfTools.chrom_to_i(chr)
        next if chrom == 0

        if omim_tmp.include? "|"
          omim = omim_tmp.split("|")[0]
        else
          omim = omim_tmp
        end

        disorder = Disorder.find_by_disorder_id(omim)
        disorder_id = disorder.id if disorder

        var_pos = Position.find_or_create_by(chr: chrom, pos: pos.to_i, reference_genome_id: 0)
        mut = Mutation.find_or_create_by(ref: ref, alt: alt)
        mut_pos = MutationsPosition.find_or_create_by(mutation_id: mut.id, position_id: var_pos.id)
        gene_entry = Gene.find_or_create_by(entrez_id: gene)
        sig_entry = ClinicalSignificance.find_or_create_by(name: sig)
        status_entry = ReviewStatus.find_or_create_by(name: status)
        ann = Annotation.create(clinical_significance_id: sig_entry.id, review_status_id: status_entry.id, hgvs: hgvs, gene_id: gene_entry.id, clinvar_id: var_id.to_i, user_id: sub.id, scv: scv, version: version, genotype: genotype, disorder_id: disorder_id)
        MutationsAnnotation.create(mutations_position_id: mut_pos.id, annotation_id: ann.id)

        @@log.debug "Submission completed: #{scv}"
      end
    end
    @@log.info "Add all clinvar complete"
  end


  desc "Add clinical signicance"
  task :default_cli_sig => :environment do
    @@log = Logger.new('log/bootstrap.log')
    ClinicalSignificance.create(:name => 'Benign', :value => 1)
    ClinicalSignificance.create(:name => 'Likely benign', :value => 2)
    ClinicalSignificance.create(:name => 'Uncertain significance', :value => 3)
    ClinicalSignificance.create(:name => 'Likely pathogenic', :value => 4)
    ClinicalSignificance.create(:name => 'Pathogenic', :value => 5)

    @@log.info "Add clinifical significance complete"
  end

  desc "Add review status"
  task :default_review_status => :environment do
    @@log = Logger.new('log/bootstrap.log')
    ReviewStatus.create(:name => 'practice guideline')
    ReviewStatus.create(:name => 'reviewed by expert panel')
    ReviewStatus.create(:name => 'criteria provided, multiple submitters, no conflicts')

    @@log.info "Add review status complete"
  end

  desc "Run all clinvar default import"
  task :all => [:default_cli_sig, :default_review_status, :import_clinvar]
end
