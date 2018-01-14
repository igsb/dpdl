class MutationsPosition < ApplicationRecord
  belongs_to :position, :optional => true
  belongs_to :mutation, :optional => true
  has_many :mutations_hgvs_codes
  has_many :hgvs_codes, :through => :mutations_hgvs_codes
  has_many :mutations_dbsnps
  has_many :dbsnps, :through => :mutations_dbsnps
  has_many :disorders_mutations_scores
  has_many :genes_mutations
  has_many :genes, :through => :genes_mutations
end
