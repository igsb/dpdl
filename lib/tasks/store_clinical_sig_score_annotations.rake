require 'csv'
namespace :clinvar do

  desc "Set annotation score by clinical significance value"
  task :store_scores => :environment do
    Annotation.all.each do |ann|
      ann.score = ann.clinical_significance.value
      ann.save
    end
  end
end
