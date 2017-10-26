class CreateGenesMutations < ActiveRecord::Migration[5.1]
  def change
    create_table :genes_mutations do |t|
      t.integer :mutation_id
      t.integer :gene_id

      t.timestamps
    end
  end
end
