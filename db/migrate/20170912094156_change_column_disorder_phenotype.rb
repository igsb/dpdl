class ChangeColumnDisorderPhenotype < ActiveRecord::Migration[5.1]
  def change
    add_column :disorders_phenotype_scores, :patients_disorder_id, :integer
    remove_column :disorders_phenotype_scores, :patient_id, :integer
    remove_column :disorders_phenotype_scores, :version, :integer
  end
end
