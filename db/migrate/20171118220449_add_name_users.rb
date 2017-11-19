class AddNameUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :first_name, :string, :limit => 46
    add_column :users, :last_name, :string, :limit => 46
    add_column :users, :institute, :string
    add_column :users, :title, :string, :limit => 6
  end
end
