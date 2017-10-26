class CreatePedia < ActiveRecord::Migration[5.1]
  def change
    create_table :pedia do |t|
      t.integer :patient_id
      t.integer :score_id
      t.string :gene_id
      t.string :gene_symbol
      t.float :score

      t.timestamps
    end
  end
end
