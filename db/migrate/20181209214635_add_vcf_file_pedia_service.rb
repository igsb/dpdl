class AddVcfFilePediaService < ActiveRecord::Migration[5.1]
  def change
    add_column :pedia_services, :vcf_file_id, :integer
  end
end
