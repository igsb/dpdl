class AddLabF2gIdLab < ActiveRecord::Migration[5.1]
  def change
    add_column :labs, :lab_f2g_id, :integer
  end
end
