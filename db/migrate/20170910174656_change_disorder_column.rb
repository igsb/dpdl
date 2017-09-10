class ChangeDisorderColumn < ActiveRecord::Migration[5.1]
  def change
    change_column :disorders, :disorder_name, :string, :limit => 128
  end
end
