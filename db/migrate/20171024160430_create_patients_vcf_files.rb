class CreatePatientsVcfFiles < ActiveRecord::Migration[5.1]
  def change
    create_table :patients_vcf_files do |t|
      t.integer :patient_id
      t.integer :vcf_file_id
      t.string :name, :limit => 64

      t.timestamps
    end
  end
end
