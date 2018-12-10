require 'csv'
namespace :bootstrap do
  desc "Add the default figure types"
  task :default_figure_type => :environment do
    @@log = Logger.new('log/bootstrap.log')
    FigureType.find_or_create_by(name: 'manhattan')
    @@log.info "Add figure type complete"
  end

  desc "Add the default types"
  task :default_type => :environment do
    @@log = Logger.new('log/bootstrap.log')
    SearchType.find_or_create_by(type_name: 'HPO')
    SearchType.find_or_create_by(type_name: 'OMIM')
    SearchType.find_or_create_by(type_name: 'Case ID')
    SearchType.find_or_create_by(type_name: 'Submitter')
    @@log.info "Add search type complete"
  end

  desc 'Add the diagnosis types'
  task :default_diagnosis_type => :environment do
    @@log = Logger.new('log/bootstrap.log')
    DiagnosisType.find_or_create_by(name: DiagnosisType::UNKNOWN)
    DiagnosisType.find_or_create_by(name: DiagnosisType::DIFFERENTIAL_DIAGNOSIS)
    DiagnosisType.find_or_create_by(name: DiagnosisType::MOLECULARLY_DIAGNOSED)
    DiagnosisType.find_or_create_by(name: DiagnosisType::CLINICALLY_DIAGNOSED)
    @@log.info 'Add diagnosed type complete'
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
    @@log = Logger.new('log/PS.log')
    count = 0
    CSV.foreach("public/phenotypicSeries.txt", {:col_sep => "\t"}) do |row|
      if count > 2
        if row.count == 2
          # Phenotypic series
          title = row[1]
          number = row[0].split("PS")[1]
          Disorder.find_or_create_by(omim_id: number,
                                     disorder_name: title,
                                     is_phenotypic_series: true,
                                     omim: true)
        else
          # Disorder
          title = row[2]
          number = row[1]
          #ps = row[0].split("PS")[1]
          Disorder.find_or_create_by(omim_id: number,
                                     disorder_name: title,
                                     is_phenotypic_series: false,
                                     omim: true)
          #Disorder.find_by(omim_id:ps,
          #                 is_phenotypic_series: true)
        end
      end
      count += 1
    end
    @@log.info "Add phenotypic series complete"
  end

  desc "Add phenotypic series"
  task :rename_ps_name => :environment do
    @@log = Logger.new('log/PS.log')
    count = 0
    CSV.foreach("public/phenotypicSeries.txt", {:col_sep => "\t"}) do |row|
      if count > 2
        if row.count == 2
          # Phenotypic series
          title = row[1]
          number = row[0].split("PS")[1]
          disorder = Disorder.find_by(omim_id: number,
                                      is_phenotypic_series: true)
          if disorder
            old_name = disorder.disorder_name
            disorder.disorder_name = title
            disorder.save
            @@log.debug "Rename #{number.to_s} #{old_name} to #{title}"
          else
            Disorder.create(omim_id: number,
                            disorder_name: title,
                            is_phenotypic_series: true)
            @@log.fatal "#{number.to_s} #{title} not found"
          end
        end
      end
      count += 1
    end
    @@log.info "Add phenotypic series complete"
  end

  desc "Add disorder gene relationship"
  task :default_disorder_gene => :environment do
    count = 0
    @@log = Logger.new('log/bootstrap_disorder_gene.log')
    CSV.foreach("public/genemap2.txt", {:col_sep => "\t", liberal_parsing: true}) do |row|
      if count > 3
        # check if there is omim ID row[12]
        unless row[12].nil?
          entrez_id = row[9]
          name = row[6].split(",")[0]
          gene = Gene.find_by(entrez_id: entrez_id)
          if gene.nil?
            gene = Gene.find_or_create_by(entrez_id: entrez_id, name: name)
          end
          pos = row[1]
          chr = VcfTools.chrom_to_i(row[0])
          gene.pos = pos
          gene.chr = chr
          gene.save
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
            disorder = Disorder.where(omim_id: omim, is_phenotypic_series: false).take
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


  desc "Add default pedia status"
  task :default_pedia_status => :environment do
    PediaStatus.find_or_create_by(status: PediaStatus::INIT)
    PediaStatus.find_or_create_by(status: PediaStatus::PRE_RUNNING)
    PediaStatus.find_or_create_by(status: PediaStatus::PRE_FAILED)
    PediaStatus.find_or_create_by(status: PediaStatus::WORKFLOW_RUNNING)
    PediaStatus.find_or_create_by(status: PediaStatus::WORKFLOW_FAILED)
    PediaStatus.find_or_create_by(status: PediaStatus::COMPLETE)
    PediaStatus.find_or_create_by(status: PediaStatus::UNKNOWN_FAILED)
  end
  desc "Run all bootstrapping tasks"
  task :all => [:default_type,
                :default_diagnosis_type,
                :default_omim,
                :default_hpo,
                :default_phenotypic_series,
                :default_disorder_gene,
                :default_figure_type,
                :default_cli_sig,
                :default_pedia_status]

  desc "Run hpo tasks"
  task :hpo => [:default_hpo]

  desc "Run omim phenotypic series tasks"
  task :phenotypic => [:default_phenotypic_series]

  desc "Run disorder gene relationship"
  task :disorder_gene => [:default_disorder_gene]

  desc "Run figure type"
  task :figure_type => [:default_figure_type]
end
