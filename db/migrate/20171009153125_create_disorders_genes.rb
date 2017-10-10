class CreateDisordersGenes < ActiveRecord::Migration[5.1]
  def change
    create_table :disorders_genes do |t|
      t.integer :disorder_id
      t.integer :gene_id

      t.timestamps
    end
  end
end
