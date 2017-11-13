class CreateMutationsPositions < ActiveRecord::Migration[5.1]
  def change
    create_table :mutations_positions do |t|
      t.integer :mutation_id
      t.integer :position_id

      t.timestamps
    end
  end
end
