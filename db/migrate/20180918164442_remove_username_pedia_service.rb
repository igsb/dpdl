class RemoveUsernamePediaService < ActiveRecord::Migration[5.1]
  def up
    remove_column :pedia_services, :username
    remove_column :pedia_services, :email
    remove_column :pedia_services, :case_id
  end

  def down
    add_column :pedia_services, :username, :string
    add_column :pedia_services, :email, :string
    add_column :pedia_services, :case_id, :integer
  end
end
