class PatientsDisorder < ApplicationRecord
  belongs_to :patient, optional: true
  belongs_to :disorder, optional: true
  belongs_to :diagnosis_type, optional: true

  has_many :disorders_phenotype_scores
  has_many :scores, through: :disorders_phenotype_scores, dependent: :destroy

end
