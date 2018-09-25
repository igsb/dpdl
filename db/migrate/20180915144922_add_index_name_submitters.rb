class AddIndexNameSubmitters < ActiveRecord::Migration[5.1]
  def change
    add_index :submitters, :first_name
    add_index :submitters, :last_name
  end
end
