class AddColumnSubmitters < ActiveRecord::Migration[5.1]
  def change
    add_column :submitters, :team, :string, :limit => 32
  end
end
