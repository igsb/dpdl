class Pedium < ApplicationRecord
  belongs_to :patient, :optional => true
end
