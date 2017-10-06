class PhenotypicSeries < ApplicationRecord
  has_many :phenotypic_series_disorders
  has_many :disorders, :through => :phenotypic_series_disorders
end
