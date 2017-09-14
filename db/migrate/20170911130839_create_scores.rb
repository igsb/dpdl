class CreateScores < ActiveRecord::Migration[5.1]
  def change
    create_table :scores do |t|
      t.string :name
      t.integer :provide_id

      t.timestamps
    end
  end
end
