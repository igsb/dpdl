class Score < ApplicationRecord
  has_many :disorders_phenotype_scores
  has_many :patients_disorders, :through => :disorders_phenotype_scores, :dependent => :destroy

  has_many :disorders_scores
  has_many :disorders, :through => :disorders_scores, :dependent => :destroy
end
