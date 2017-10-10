class CreateGenes < ActiveRecord::Migration[5.1]
  def change
    create_table :genes do |t|
      t.integer :gene_id
      t.string :name, limit: 255

      t.timestamps
    end
  end
end
