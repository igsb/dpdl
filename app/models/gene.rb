class Gene < ApplicationRecord
  has_many :disorders_genes
  has_many :disorders, :through => :disorders_genes
  has_many :genes_mutations
  has_many :mutations_positions, :through => :genes_mutations
  has_many :disorders_mutations_scores
  has_many :pedia

  validates :entrez_id, uniqueness: true
end
