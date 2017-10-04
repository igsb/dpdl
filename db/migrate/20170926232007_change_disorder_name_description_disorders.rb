class ChangeDisorderNameDescriptionDisorders < ActiveRecord::Migration[5.1]
  def change
    rename_column :disorders, :discription, :description
    change_column :disorders, :disorder_name, :string, :limit => 255
  end
end
