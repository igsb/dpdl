class ChangeTablePatientsFeatures < ActiveRecord::Migration[5.1]
  def change
    add_column :patients_features, :id, :primary_key
  end
end
