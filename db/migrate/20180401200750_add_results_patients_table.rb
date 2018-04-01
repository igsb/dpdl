class AddResultsPatientsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :patients, :result, :boolean, default: false
  end
end
