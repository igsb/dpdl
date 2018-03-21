require 'csv'
namespace :bootstrap do
  desc "Add the default figure types"
  task :default_figure_type => :environment do
    @@log = Logger.new('log/bootstrap.log')
    FigureType.create( :name => 'manhattan' )
    @@log.info "Add figure type complete"
  end

  desc "Add the default types"
  task :default_type => :environment do
    @@log = Logger.new('log/bootstrap.log')
    SearchType.create( :type_name => 'HPO' )
    SearchType.create( :type_name => 'OMIM' )
    SearchType.create( :type_name => 'Case id' )
    SearchType.create( :type_name => 'Submitter' )
    @@log.info "Add search type complete"
  end

  desc "Add the diagnosed types"
  task :default_diagnosed_type => :environment do
    DiagnoseType.create( :name => 'Unknown' )
    DiagnoseType.create( :name => 'Phenotypic diagnosed' )
    DiagnoseType.create( :name => 'Molecular diagnosed' )
    @@log.info "Add diagnosed type complete"
  end

  desc "Add omim"
  task :default_omim => :environment do
    CSV.foreach("public/mimTitles.txt", {:col_sep => "\t", :headers => true}) do |row|
      Disorder.create!(row.to_h)
    end
    @@log.info "Add omim disorder complete"
  end

  desc "Add phenotypic series"
  task :default_phenotypic_series => :environment do
    count = 0
    CSV.foreach("public/Phenotypic-Series-Titles-all.csv", {:col_sep => ","}) do |row|
      if count > 4
        title = row[0]
        number = row[1].split("PS")[1]
        PhenotypicSeries.create!(phenotypic_series_id:number, title:title)
        Disorder.create!(disorder_id:number, disorder_name:title, is_phenotypic_series: true)
      end
      count += 1
    end
    @@log.info "Add phenotypic series complete"
  end

  desc "Add disorder gene relationship"
  task :default_disorder_gene => :environment do
    count = 0
    @@log = Logger.new('log/bootstrap_disorder_gene.log')
    CSV.foreach("public/genemap2.txt", {:col_sep => "\t"}) do |row|
      if count > 3
        if !row[12].nil?
          entrez_id = row[9]
          name = row[6].split(",")[0]
          gene = Gene.find_or_create_by(entrez_id: entrez_id, name: name)
          omim_str = row[12].split(",")
          omim_array = Array.new
          key_array = Array.new
          omim_str.each do |omim|
            if omim.include? "(" and omim.include? ")"
              omim_tmp = omim.split(" ")   
              if omim_tmp.length > 1
                for i in 0...omim_tmp.length
                  if omim_tmp[i].include? "(" and omim_tmp[i].include? ")"
                    mapping_key_str = omim_tmp[i].split("(")[1].split(")")[0]
                    if mapping_key_str.scan(/\D/).empty? and mapping_key_str.to_i < 6 and mapping_key_str.to_i > 0
                      # mapping key is number   
                      mapping_key = mapping_key_str.to_i
                      if omim_tmp[i - 1].scan(/\D/).empty? 
                        # found omim id in the i-1 position
                        omim_array.push(omim_tmp[i - 1].to_i)
                        key_array.push(mapping_key)
                      else
                        @@log.debug "#{omim_tmp[i-1]} #{omim_tmp[i]}"
                      end
                    end
                  end
                end
              end
            end
          end
          omim_array.zip(key_array).each do |omim, key|
            disorder = Disorder.where(disorder_id: omim, is_phenotypic_series: false).take
            if disorder.nil?
              @@log.debug "omim not found: #{omim.to_s} #{row[12]}"
            else
              DisordersGene.find_or_create_by(disorder_id: disorder.id, gene_id: gene.id, mapping_key_id: key)
            end
          end
        end 
      end
      count += 1
    end
    @@log.info "Add disorder gene relationship complete"
  end

  desc "Add HPO"
  task :default_hpo => :environment do
    File.open('public/hp.obo.txt', 'r') do |fh|
      while(line = fh.gets) != nil
        if line.include? '[Term]'
          while (hpo_line = fh.gets).include? 'id: '
            hpo_term = hpo_line.split('id: ')[1].strip
            break
          end
          while (hpo_line = fh.gets).include? 'name: '
            hpo_name = hpo_line.split('name: ')[1].strip
            break
          end
          Feature.create!(hpo_term:hpo_term, description:hpo_name)
        end
      end
    end
    @@log.info "Add HPO complete"
  end

  #desc "Add clinical signicance"
  #task :default_cli_sig => :environment do
  #  @@log = Logger.new('log/bootstrap.log')
  #  ClinicalSignificance.create( :name => 'Benign' )
  #  ClinicalSignificance.create( :name => 'Likely benign' )
  #  ClinicalSignificance.create( :name => 'Uncertain significance' )
  #  ClinicalSignificance.create( :name => 'Likely pathogenic' )
  #  ClinicalSignificance.create( :name => 'Pathogenic' )

  #  @@log.info "Add clinifical significance complete"
  #end

  #desc "Add review status"
  #task :default_review_status => :environment do
  #  @@log = Logger.new('log/bootstrap.log')
  #  ClinicalSignificance.create( :name => 'Benign' )
  #  ClinicalSignificance.create( :name => 'Likely benign' )
  #  ClinicalSignificance.create( :name => 'Uncertain significance' )
  #  ClinicalSignificance.create( :name => 'Likely pathogenic' )
  #  ClinicalSignificance.create( :name => 'Pathogenic' )

  #  @@log.info "Add review status complete"
  #end

  desc "Run all bootstrapping tasks"
  task :all => [:default_type, :default_diagnosed_type, :default_omim, :default_hpo, :default_phenotypic_series, :default_disorder_gene, :default_figure_type, :default_cli_sig]

  desc "Run hpo tasks"
  task :hpo => [:default_hpo]

  desc "Run omim phenotypic series tasks"
  task :phenotypic => [:default_phenotypic_series]

  desc "Run disorder gene relationship"
  task :disorder_gene => [:default_disorder_gene]

  desc "Run figure type"
  task :figure_type => [:default_figure_type]
end
