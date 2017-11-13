class Pedium < ApplicationRecord
  belongs_to :patient, :optional => true
  belongs_to :gene, :optional => true
end
