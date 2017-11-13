class RemoveAnnotaionColMutationPositions < ActiveRecord::Migration[5.1]
  def change
    remove_column :mutations_positions, :annotation_id
    add_column :annotations, :mutations_position_id, :integer
  end
end
