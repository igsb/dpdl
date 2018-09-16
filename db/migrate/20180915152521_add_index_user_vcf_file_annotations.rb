class AddIndexUserVcfFileAnnotations < ActiveRecord::Migration[5.1]
  def change
    add_index :annotations, :user_id
    add_index :annotations, :patients_vcf_file_id
  end
end
