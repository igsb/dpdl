class AddUniqueIdxUsersPatients < ActiveRecord::Migration[5.1]
  def change
    add_index :users_patients, [:user_id, :patient_id], :unique => true
  end
end
