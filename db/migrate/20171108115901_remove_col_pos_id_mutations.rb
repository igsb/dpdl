class RemoveColPosIdMutations < ActiveRecord::Migration[5.1]
  def change
    remove_column :mutations, :position_id
  end
end
