class RemoveClassificationIdAnnotation < ActiveRecord::Migration[5.1]
  def up
    remove_column :annotations, :classification_id
  end
  def down
    add_column :annotations, :classification_id, :integer
  end
end
