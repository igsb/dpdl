class AddFullPathReceivedVcfFiles < ActiveRecord::Migration[5.1]
  def change
    add_column :uploaded_vcf_files, :full_path, :string
  end
end
