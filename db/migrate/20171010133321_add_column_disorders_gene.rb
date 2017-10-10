class AddColumnDisordersGene < ActiveRecord::Migration[5.1]
  def change
    add_column :disorders_genes, :mapping_key_id, :integer
  end
end
