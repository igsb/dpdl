class CreatePatientsDisorders < ActiveRecord::Migration[5.1]
  def change
    create_table :patients_disorders, :id => false do |t|
      t.integer :patient_id, null: false
      t.integer :disorder_id, null: false

      t.timestamps
    end

    add_index :patients_disorders, [:disorder_id, :patient_id], :unique => true
    remove_index :patients_features, :feature_id
    add_index :patients_features, [:feature_id, :patient_id], :unique => true
  end
end
