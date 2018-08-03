class CreateGroupPatients < ActiveRecord::Migration[5.1]
  def change
    create_table :group_patients do |t|
      t.integer :patient_id
      t.integer :group_id
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps
    end
  end
end
