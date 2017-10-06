class PhenotypicSeriesDisorder < ApplicationRecord
  belongs_to :disorder, optional: true
  belongs_to :phenotypic_series, optional: true
end
