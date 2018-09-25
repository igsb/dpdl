class RenameDisorderIdToOmimDirsorders < ActiveRecord::Migration[5.1]
  def self.up
    rename_column :disorders, :disorder_id, :omim_id
  end

  def self.down
    rename_column :disorders, :omim_id, :disorder_id
  end
end
