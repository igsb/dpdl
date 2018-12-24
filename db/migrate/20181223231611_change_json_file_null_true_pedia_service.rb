class ChangeJsonFileNullTruePediaService < ActiveRecord::Migration[5.1]
  def up
    change_column :pedia_services, :json_file, :string, :null => true
  end

  def down
    change_column :pedia_services, :json_file, :string, :null => false
  end
end
