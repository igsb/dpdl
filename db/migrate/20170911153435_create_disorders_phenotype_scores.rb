class CreateDisordersPhenotypeScores < ActiveRecord::Migration[5.1]
  def change
    create_table :disorders_phenotype_scores do |t|
      t.integer :patient_id, null: false
      t.integer :score_id, null: false
      t.float :value, null: false
      t.string :version, limit: 32

      t.timestamps
    end
  end

  change_column :scores, :name, :string, :limit => 16
end
