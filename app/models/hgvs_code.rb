class HgvsCode < ApplicationRecord
  has_many :mutations_hgvs_code
  has_many :mutations_positions, :through => :mutations_hgvs_code
end
