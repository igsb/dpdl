class ChangeColumnPatientsDisorders < ActiveRecord::Migration[5.1]
  def change
    change_column :patients_disorders, :diagnosed, :integer
  end
end
