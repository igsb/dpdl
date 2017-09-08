class CreatePatientsFeatures < ActiveRecord::Migration[5.1]
  def change
    create_table :patients_features, :id => false do |t|
      t.integer :patient_id, null: false
      t.integer :feature_id, null: false

      t.timestamps
    end

    add_index :patients_features, :feature_id, unique: true
  end
end
