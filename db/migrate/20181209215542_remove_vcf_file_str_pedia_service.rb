class RemoveVcfFileStrPediaService < ActiveRecord::Migration[5.1]
  def up
    remove_column :pedia_services, :vcf_file
  end

  def down
    add_column :pedia_services, :vcf_file, :string
  end
end
