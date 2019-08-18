class ChangePatientsFeaturesIndex < ActiveRecord::Migration[5.1]
  def change
    remove_index :patients_features, [:feature_id, :patient_id]
    add_index :patients_features, [:feature_id, :patient_id, :present], unique: true
  end
end
