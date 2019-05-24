class AddIndexPedia < ActiveRecord::Migration[5.1]
  def change
    add_index :pedia, [:pedia_service_id, :gene_id, :patient_id]
  end
end
