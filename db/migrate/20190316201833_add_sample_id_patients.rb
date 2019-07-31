class AddSampleIdPatients < ActiveRecord::Migration[5.1]
  def change
    add_column :patients, :sample_id, :string
  end
end
