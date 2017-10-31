class PatientsVcfFile < ApplicationRecord
  belongs_to :patient, optional: true
  belongs_to :vcf_file, optional: true
  #belongs_to :disorders_mutation_scores, optional: true
end
