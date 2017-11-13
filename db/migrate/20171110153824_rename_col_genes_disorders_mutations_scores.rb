class RenameColGenesDisordersMutationsScores < ActiveRecord::Migration[5.1]
  def change
    rename_column :disorders_mutations_scores, :mutation_id, :mutations_position_id
  end
end
