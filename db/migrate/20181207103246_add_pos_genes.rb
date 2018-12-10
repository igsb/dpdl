class AddPosGenes < ActiveRecord::Migration[5.1]
  def change
    add_column :genes, :chr, :integer
    add_column :genes, :pos, :string
  end
end
