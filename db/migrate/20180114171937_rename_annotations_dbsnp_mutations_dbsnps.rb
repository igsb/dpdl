class RenameAnnotationsDbsnpMutationsDbsnps < ActiveRecord::Migration[5.1]
  def change
    rename_table :annotations_dbsnps, :mutations_dbsnps
    rename_column :mutations_dbsnps, :annotation_id, :mutations_position_id
  end
end
