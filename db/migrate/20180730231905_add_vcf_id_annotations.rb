class AddVcfIdAnnotations < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :vcf_id, :integer
  end
end
