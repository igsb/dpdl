class Dbsnp < ApplicationRecord
  has_many :annotations_dbsnps
  has_many :annotations, :through => :annotations_dbsnps
end
