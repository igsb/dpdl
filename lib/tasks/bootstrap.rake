require 'csv'
namespace :bootstrap do
  desc "Add the default types"
  task :default_type => :environment do
    SearchType.create( :type_name => 'HPO' )
    SearchType.create( :type_name => 'OMIM' )
    SearchType.create( :type_name => 'Case id' )
  end

  desc "Add the diagnosed types"
  task :default_diagnosed_type => :environment do
    DiagnoseType.create( :name => 'Unknown' )
    DiagnoseType.create( :name => 'Phenotypic diagnosed' )
    DiagnoseType.create( :name => 'Molecular diagnosed' )
  end

  desc "Add omim"
  task :default_omim => :environment do
    CSV.foreach("public/mimTitles.txt", {:col_sep => "\t", :headers => true}) do |row|
      Disorder.create!(row.to_h)
    end
  end

  desc "Add phenotypic series"
  task :default_phenotypic_series => :environment do
    count = 0
    CSV.foreach("public/Phenotypic-Series-Titles-all.csv", {:col_sep => ","}) do |row|
      if count > 4
        title = row[0]
        number = row[1].split("PS")[1]
	PhenotypicSeries.create!(phenotypic_series_id:number, title:title)
      end
      count += 1
    end
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
  end

  desc "Run all bootstrapping tasks"
  task :all => [:default_type, :default_diagnosed_type, :default_omim, :default_hpo, :default_phenotypic_series]
  
  desc "Run hpo tasks"
  task :hpo => [:default_hpo]

  desc "Run omim phenotypic seriestasks"
  task :phenotypic => [:default_phenotypic_series]
end
