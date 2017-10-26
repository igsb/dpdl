class AddColumnPatientsDisorders < ActiveRecord::Migration[5.1]
  def change
    add_column :patients_disorders, :diagnosed, :boolean, default: false
  end
end
