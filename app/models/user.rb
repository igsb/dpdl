class User < ApplicationRecord
  has_many :vcf_files
  belongs_to :login, :optional => true
end
