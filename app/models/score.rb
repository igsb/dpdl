class Score < ApplicationRecord
  has_many :disorders_phenotype_scores
  has_many :patients_disorders, :through => :disorders_phenotype_scores, :dependent => :destroy
end
