class AddColumnLogins < ActiveRecord::Migration[5.1]
  def change
    add_column :logins, :username, :string
  end
end
