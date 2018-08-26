require 'csv'
namespace :clinvar do

  desc "Set annotation score by clinical significance value"
  task :store_scores => :environment do
    Annotation.all.each do |ann|
      ann.score = ann.clinical_significance.value
      ann.save
    end
  end

  desc "Set max annotation score by clinical significance value"
  task :store_max_score => :environment do
    MutationsPosition.all.each do |mut_pos|
      max_score = mut_pos.annotations.maximum('score')
      if max_score
        mut_pos.max_classification = max_score
      else
        mut_pos.max_classification = 0
      end
      mut_pos.save
    end
  end
end
