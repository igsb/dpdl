class ChangeDefaultPatientsDisorders < ActiveRecord::Migration[5.1]
  def change
    change_column :patients_disorders, :diagnosed, :integer, :default => 1
  end
end
