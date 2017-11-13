class ChangeGenotypeDisordersMutationsScores < ActiveRecord::Migration[5.1]
  def change
    change_column :disorders_mutations_scores, :genotype, :string, :limit => 4
  end
end
