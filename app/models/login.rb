class Login < ApplicationRecord
  has_many :vcf_files
  belongs_to :user
end
