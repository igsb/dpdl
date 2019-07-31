class RemoveIndexVcfFileDisordersMutationsScores < ActiveRecord::Migration[5.1]
  def change
    remove_index "disorders_mutations_scores", name: "index_disorders_mutations_scores_on_patients_vcf_file_id"
  end
end
