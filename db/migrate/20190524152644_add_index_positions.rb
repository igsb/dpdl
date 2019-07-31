class AddIndexPositions < ActiveRecord::Migration[5.1]
  def change
    add_index :positions, [:chr, :pos, :reference_genome_id]
  end
end
