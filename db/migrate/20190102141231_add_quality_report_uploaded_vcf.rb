class AddQualityReportUploadedVcf < ActiveRecord::Migration[5.1]
  def change
    add_column :uploaded_vcf_files, :quality_report_path, :string
    add_column :uploaded_vcf_files, :quality_result, :string
  end
end
