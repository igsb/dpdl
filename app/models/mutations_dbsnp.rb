class MutationsDbsnp < ApplicationRecord
  belongs_to :mutations_position, :optional => true
  belongs_to :dbsnp, :optional => true
end
