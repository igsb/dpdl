class DisordersPhenotypeScore < ApplicationRecord
  belongs_to :patients_disorder, :optional => true
  belongs_to :score, :optional => true
end
