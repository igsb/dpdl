class AddIndexDisordersMutationsScores < ActiveRecord::Migration[5.1]
  def change
    add_index :disorders_mutations_scores, :patients_vcf_file_id
    add_index :disorders_mutations_scores, :gene_id
  end
end
