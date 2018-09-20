class RenameDiagnoseTypeTable < ActiveRecord::Migration[5.1]
  def self.up
    rename_table :diagnose_types, :diagnosis_types
  end

  def self.down
    rename_table :diagnosis_types, :diagnose_types
  end
end
