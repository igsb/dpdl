class MutationsPosition < ApplicationRecord
  belongs_to :position, :optional => true
  belongs_to :mutation, :optional => true
  has_many :annotations
  has_many :disorders_mutations_scores
  has_many :genes_mutations
  has_many :genes, :through => :genes_mutations
end
