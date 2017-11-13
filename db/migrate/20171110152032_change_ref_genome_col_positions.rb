class ChangeRefGenomeColPositions < ActiveRecord::Migration[5.1]
  def up
    change_column :positions, :reference_genome, :integer
    rename_column :positions, :reference_genome, :reference_genome_id
  end
  def down
    rename_column :positions, :reference_genome_id, :reference_genome
    change_column :positions, :reference_genome, :string
  end
end
