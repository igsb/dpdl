class AddColEffectGenesMutations < ActiveRecord::Migration[5.1]
  def change
    add_column :genes_mutations, :effect, :string, :limit => 64
  end
end
