class PatientsVcfFile < ApplicationRecord
  belongs_to :patient, optional: true
  belongs_to :vcf_file, optional: true
  has_many :disorders_mutations_scores, :dependent => :destroy
  has_many :mutations_positions, :through => :disorders_mutations_scores
  has_many :annotations
end
