class AddValueClassification < ActiveRecord::Migration[5.1]
  def change
    add_column :clinical_significances, :value, :integer, default: 0
  end
end
