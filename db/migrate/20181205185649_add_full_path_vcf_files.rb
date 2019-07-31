class AddFullPathVcfFiles < ActiveRecord::Migration[5.1]
  def change
    add_column :vcf_files, :full_path, :string
  end
end
