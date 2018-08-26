class RenameVcfIdPVcfIdInPatientsVcfFiles < ActiveRecord::Migration[5.1]
  def self.up
    rename_column :annotations, :vcf_id, :patients_vcf_file_id
  end

  def self.down
    rename_column :annotations, :patients_vcf_file_id, :vcf_id
  end
end
