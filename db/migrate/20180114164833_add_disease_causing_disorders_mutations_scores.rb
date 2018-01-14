class AddDiseaseCausingDisordersMutationsScores < ActiveRecord::Migration[5.1]
  def change
    add_column :disorders_mutations_scores, :disease_causing, :boolean, :null => false, :default => false 
  end
end
