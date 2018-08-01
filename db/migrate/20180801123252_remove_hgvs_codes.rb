class RemoveHgvsCodes < ActiveRecord::Migration[5.1]
  def up
    drop_table :hgvs_codes
  end

  def down
    fail ActiveRecord::IrreversibleMigration
  end
end
