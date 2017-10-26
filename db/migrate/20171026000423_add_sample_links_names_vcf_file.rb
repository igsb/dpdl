class AddSampleLinksNamesVcfFile < ActiveRecord::Migration[5.1]
  def change
    add_column :vcf_files, :sample_names, :text
    add_column :vcf_files, :sample_links, :text
    add_column :vcf_files, :gender, :text
  end
end
