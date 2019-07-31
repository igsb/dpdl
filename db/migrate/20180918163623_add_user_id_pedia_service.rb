class AddUserIdPediaService < ActiveRecord::Migration[5.1]
  def change
    add_column :pedia_services, :user_id, :integer
    add_column :pedia_services, :patient_id, :integer
    add_index :pedia_services, :user_id
    add_index :pedia_services, :patient_id
  end
end
