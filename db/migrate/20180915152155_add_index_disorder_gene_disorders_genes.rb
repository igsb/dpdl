class AddIndexDisorderGeneDisordersGenes < ActiveRecord::Migration[5.1]
  def change
    add_index :disorders_genes, [:disorder_id, :gene_id]
    add_index :disorders_genes, :mapping_key_id
  end
end
