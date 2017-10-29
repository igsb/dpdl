class ChangeColumnPatients < ActiveRecord::Migration[5.1]
  def change
    rename_column :patients, :patient_id, :case_id
  end
end
