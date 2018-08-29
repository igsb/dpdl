class CreateUploadedVcfFiles < ActiveRecord::Migration[5.1]
  def change
    create_table :uploaded_vcf_files do |t|
      t.integer :case_id
      t.string :file_name
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps
    end
  end
end
