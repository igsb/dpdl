class RenameSubmitterToUserAnnotations < ActiveRecord::Migration[5.1]
  def self.up
    rename_column :annotations, :submitter_id, :user_id
  end

  def self.down
    rename_column :annotations, :submitter_id, :user_id
  end
end
