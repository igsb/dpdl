class CreateVcfFiles < ActiveRecord::Migration[5.1]
  def change
    create_table :vcf_files do |t|
      
      t.string :name, :limit => 100
      t.integer :user_id
      t.integer :patients_vcf_file_id
      t.integer :preprocessors
      t.integer :filtered
      t.text :comment
      t.integer :comment_lines
      t.integer :lines
      t.date :date
      t.text :vcf_link
      t.timestamps
    end
  end
end
