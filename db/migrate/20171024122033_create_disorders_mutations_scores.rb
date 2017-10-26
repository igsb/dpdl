class CreateDisordersMutationsScores < ActiveRecord::Migration[5.1]
  def change
    create_table :disorders_mutations_scores do |t|
      t.integer :patients_vcf_file_id
      t.integer :score_id
      t.integer :disorder_id
      t.integer :gene_id
      t.integer :mutation_id
      t.float :value
      t.integer :genotype

      t.timestamps
    end
  end
end
