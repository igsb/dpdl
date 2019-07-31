class Pedium < ApplicationRecord
  belongs_to :patient, :optional => true
  belongs_to :gene, :optional => true
  belongs_to :pedia_service, :optional => true
end
