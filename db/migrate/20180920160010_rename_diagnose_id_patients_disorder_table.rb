class RenameDiagnoseIdPatientsDisorderTable < ActiveRecord::Migration[5.1]
  def self.up
    rename_column :patients_disorders, :diagnose_type_id, :diagnosis_type_id
  end

  def self.down
    rename_column :patients_disorders, :diagnosis_type_id, :diagnose_type_id
  end
end
