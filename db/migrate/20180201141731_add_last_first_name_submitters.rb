class AddLastFirstNameSubmitters < ActiveRecord::Migration[5.1]
  def change
    remove_column :submitters, :name, :string
    add_column :submitters, :first_name, :string, :limit => 46
    add_column :submitters, :last_name, :string, :limit => 46
  end
end
