class CreateMutations < ActiveRecord::Migration[5.1]
  def change
    create_table :mutations do |t|
      t.integer :position_id
      t.string :ref, :limit => 16
      t.string :alt, :limit => 16
      t.text :annotation

      t.timestamps
    end
  end
end
