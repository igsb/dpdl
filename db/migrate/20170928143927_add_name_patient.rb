class AddNamePatient < ActiveRecord::Migration[5.1]
  def change
    add_column :patients, :last_name, :string, :limit => 46
    add_column :patients, :first_name, :string, :limit => 46
  end
end
