class ChangeHgvsMutations < ActiveRecord::Migration[5.1]
  def up
    change_column :mutations, :hgvs, :string
  end
  def down
    change_column :mutations, :hgvs, :string, :limit => 32
  end
end
