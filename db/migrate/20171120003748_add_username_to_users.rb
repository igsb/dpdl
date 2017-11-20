class AddUsernameToUsers < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :username, :string, unique: true
  end
end
