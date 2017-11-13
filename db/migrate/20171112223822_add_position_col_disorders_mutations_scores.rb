class AddPositionColDisordersMutationsScores < ActiveRecord::Migration[5.1]
  def change
    add_column :disorders_mutations_scores, :position_id, :integer
  end
end
