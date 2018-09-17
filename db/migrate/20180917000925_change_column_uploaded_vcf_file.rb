class ChangeColumnUploadedVcfFile < ActiveRecord::Migration[5.1]
  def up
    rename_column :uploaded_vcf_files, :case_id, :patient_id
  end

  def down
    rename_column :uploaded_vcf_files, :patient_id, :case_id
  end
end
