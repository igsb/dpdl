class DisordersMutationsScore < ApplicationRecord
  belongs_to :patients_vcf_file, :optional => true
  belongs_to :mutations_position, :optional => true
  belongs_to :disorders_gene, :optional => true
end
