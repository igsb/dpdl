class DisordersMutationsScore < ApplicationRecord
  #has_many :patients_vcf_files
  #has_many :patients, :through => :patients_vcf_files

  belongs_to :mutation, :optional => true
  belongs_to :disorders_gene, :optional => true
end
