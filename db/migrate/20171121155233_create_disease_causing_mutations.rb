class CreateDiseaseCausingMutations < ActiveRecord::Migration[5.1]
  def change
    create_table :disease_causing_mutations do |t|
      t.integer :patient_id
      t.string :genotype
      t.string :gene_name
      t.string :hgvs

      t.timestamps
    end
  end
end
