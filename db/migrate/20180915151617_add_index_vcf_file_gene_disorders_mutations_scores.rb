class AddIndexVcfFileGeneDisordersMutationsScores < ActiveRecord::Migration[5.1]
  def change
    add_index :disorders_mutations_scores, [:patients_vcf_file_id, :gene_id], name: :idx_disorder_mut_vcf_file_id_gene_id
  end
end
