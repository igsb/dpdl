class ChangeAltMutations < ActiveRecord::Migration[5.1]
  def up
    change_column :mutations, :alt, :string
    change_column :mutations, :ref, :string
  end
  def down
    change_column :mutations, :alt, :string, :limit => 16
    change_column :mutations, :ref, :string, :limit => 16
  end
end
