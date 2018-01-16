class AddColumnAnnotations < ActiveRecord::Migration[5.1]
  def change
    remove_column :annotations, :mutations_position_id, :integer
    add_column :annotations, :submitter_id, :integer
    add_column :annotations, :clinical_significance_id, :integer
    add_column :annotations, :review_status_id, :integer
    add_column :annotations, :gene_id, :integer
    add_column :annotations, :clinvar_id, :integer
    add_column :annotations, :comment, :string
    add_column :annotations, :hgvs, :string
    add_column :annotations, :genotype, :string
    add_column :annotations, :version, :string
    add_column :annotations, :scv, :string, :unique => true
    
  end
end
