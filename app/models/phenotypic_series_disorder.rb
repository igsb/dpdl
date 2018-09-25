class PhenotypicSeriesDisorder < ApplicationRecord
  belongs_to :child_disorder, class_name: 'Disorder', optional: true, foreign_key: 'disorder_id'
  belongs_to :phenotypic_series, class_name: 'Disorder', optional: true, foreign_key: 'phenotypic_series_id'
end
