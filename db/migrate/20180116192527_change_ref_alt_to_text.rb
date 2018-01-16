class ChangeRefAltToText < ActiveRecord::Migration[5.1]
  def up
    change_column :mutations, :ref, :text
    change_column :mutations, :alt, :text
  end

  def down
    change_column :mutations, :ref, :string
    change_column :mutations, :alt, :string
  end
end
