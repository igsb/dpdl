class AddColumnsPediaServices < ActiveRecord::Migration[5.1]
  def change
    add_column :pedia_services, :username, :string, null: false
    add_column :pedia_services, :email, :string, null: false
    add_column :pedia_services, :json_file, :string, null: false
    add_column :pedia_services, :vcf_file, :string, null: false
  end
end
