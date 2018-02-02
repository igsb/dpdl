class CreateUsersPatients < ActiveRecord::Migration[5.1]
  def change
    create_table :users_patients do |t|
      t.integer :patient_id
      t.integer :user_id

      t.timestamps
    end
  end
end
