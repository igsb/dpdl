class MutationsHgvsCode < ApplicationRecord
  belongs_to :mutations_position, :optional => true
end
