class AddIndexMutationsPositions < ActiveRecord::Migration[5.1]
  def change
    add_index :mutations_positions, [:mutation_id, :position_id]
  end
end
