class AddTranscriptGenesMutations < ActiveRecord::Migration[5.1]
  def change
    add_column :genes_mutations, :seq_type, :string, :limit => 16
    add_column :genes_mutations, :seq, :string, :limit => 16
    add_column :genes_mutations, :region, :string, :limit => 16
  end
end
