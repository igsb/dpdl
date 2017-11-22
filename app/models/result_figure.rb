class ResultFigure < ApplicationRecord
  belongs_to :patient, :optional => true
  belongs_to :figure_type, :optional => true
end
