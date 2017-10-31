class AddScorePedia < ActiveRecord::Migration[5.1]
  def change
    add_column :pedia, :pedia_score, :float
    add_column :pedia, :cadd_score, :float
    add_column :pedia, :pheno_score, :float
    add_column :pedia, :gestalt_score, :float
  end
end
