class CreatePositions < ActiveRecord::Migration[5.1]
  def change
    create_table :positions do |t|
      t.integer :chr
      t.string :pos
      t.string :reference_genome

      t.timestamps
    end
  end
end
