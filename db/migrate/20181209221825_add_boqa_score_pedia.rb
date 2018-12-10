class AddBoqaScorePedia < ActiveRecord::Migration[5.1]
  def change
    add_column :pedia, :boqa_score, :float
    add_column :pedia, :feature_score, :float
    add_column :pedia, :label, :boolean
    add_column :pedia, :pedia_service_id, :integer
  end
end
