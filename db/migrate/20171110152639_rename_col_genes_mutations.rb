class RenameColGenesMutations < ActiveRecord::Migration[5.1]
  def change
    remove_column :genes_mutations, :seq
    remove_column :genes_mutations, :seq_type
    remove_column :genes_mutations, :region
    rename_column :genes_mutations, :mutation_id, :mutations_position_id
  end
end
