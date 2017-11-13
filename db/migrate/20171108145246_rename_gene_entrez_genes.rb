class RenameGeneEntrezGenes < ActiveRecord::Migration[5.1]
  def change
    rename_column :genes, :gene_id, :entrez_id
  end
end
