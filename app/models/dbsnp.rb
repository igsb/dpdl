class Dbsnp < ApplicationRecord
  has_many :mutations_dbsnps
  has_many :mutations_positions, :through => :mutations_dbsnps
end
