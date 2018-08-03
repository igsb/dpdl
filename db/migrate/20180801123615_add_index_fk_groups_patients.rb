class AddIndexFkGroupsPatients < ActiveRecord::Migration[5.1]
  def change
    add_index :groups_patients, [:group_id, :patient_id], :unique => true

  end
end
