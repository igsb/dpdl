class MutationsHgvsCode < ApplicationRecord
  belongs_to :mutations_position, :optional => true
  belongs_to :hgvs_code, :optional => true
end
