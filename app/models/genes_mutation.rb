class GenesMutation < ApplicationRecord
  belongs_to :gene, :optional => true
  belongs_to :mutations_position, :optional => true
end
