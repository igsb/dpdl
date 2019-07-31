class AddLabIdPatients < ActiveRecord::Migration[5.1]
  def change
    add_column :patients, :lab_id, :integer
    add_index :patients, [:case_id, :lab_id]
  end
end
