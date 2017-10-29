class CreateDisordersScores < ActiveRecord::Migration[5.1]
  def change
    create_table :disorders_scores do |t|
      t.integer :disorder_id, :null => false
      t.integer :score_id, :null => false
      t.boolean :has_mask, :null => false, :default => false

      t.timestamps
    end
  end
end
