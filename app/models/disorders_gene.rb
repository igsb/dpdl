class DisordersGene < ApplicationRecord
  belongs_to :disorder, optional: true
  belongs_to :gene, optional: true
end
