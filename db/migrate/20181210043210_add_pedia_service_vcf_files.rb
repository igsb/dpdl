class AddPediaServiceVcfFiles < ActiveRecord::Migration[5.1]
  def change
    add_column :vcf_files, :pedia_service_id, :integer
  end
end
