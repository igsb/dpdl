class AddPediaServiceSampleIndex < ActiveRecord::Migration[5.1]
  def change
    add_column :pedia_services, :vcf_sample_index, :integer, :default => 0
  end
end
