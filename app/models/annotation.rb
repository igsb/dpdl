class Annotation < ApplicationRecord
  belongs_to :mutations_position, :optional => true
  has_many :annotations_dbsnps
  has_many :dbsnps, :through => :annotations_dbsnps
  has_many :classifications
end
