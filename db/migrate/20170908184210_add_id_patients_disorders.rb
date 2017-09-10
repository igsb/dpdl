class AddIdPatientsDisorders < ActiveRecord::Migration[5.1]
  def change
    add_column :patients_disorders, :id, :primary_key
  end
end
