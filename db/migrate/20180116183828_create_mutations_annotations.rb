class CreateMutationsAnnotations < ActiveRecord::Migration[5.1]
  def change
    create_table :mutations_annotations do |t|
      t.integer :mutations_position_id
      t.integer :annotation_id

      t.timestamps
    end
  end
end
