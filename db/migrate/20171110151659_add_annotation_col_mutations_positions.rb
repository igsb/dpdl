class AddAnnotationColMutationsPositions < ActiveRecord::Migration[5.1]
  def change
    add_column :mutations_positions, :annotation_id, :integer
  end
end
