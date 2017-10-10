class Gene < ApplicationRecord
  has_many :disorders_genes
  has_many :disorders, :through => :disorders_genes
end
