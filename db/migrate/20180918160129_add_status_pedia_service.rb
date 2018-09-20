class AddStatusPediaService < ActiveRecord::Migration[5.1]
  def change
    add_column :pedia_services, :pedia_status_id, :integer
  end
end
