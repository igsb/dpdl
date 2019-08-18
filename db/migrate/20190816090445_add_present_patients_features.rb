class AddPresentPatientsFeatures < ActiveRecord::Migration[5.1]
  def change
    add_column :patients_features, :present, :boolean, default: true
  end
end
