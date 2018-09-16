class AddIndexMutIdGeneIdGenesMutations < ActiveRecord::Migration[5.1]
  def change
    add_index :genes_mutations, [:mutations_position_id, :gene_id]
  end
end
