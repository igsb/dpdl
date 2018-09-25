class AddUserUploadVcfs < ActiveRecord::Migration[5.1]
  def change
    add_column :uploaded_vcf_files, :user_id, :integer
  end
end
