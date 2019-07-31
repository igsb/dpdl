class AddUploadedVcfFilePediaService < ActiveRecord::Migration[5.1]
  def change
    add_column :pedia_services, :uploaded_vcf_file_id, :integer
  end
end
