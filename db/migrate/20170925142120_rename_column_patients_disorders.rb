class RenameColumnPatientsDisorders < ActiveRecord::Migration[5.1]
  def change
    rename_column :patients_disorders, :diagnosed, :diagnose_type_id
  end
end
