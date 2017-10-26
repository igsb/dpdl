class CreatePatients < ActiveRecord::Migration[5.1]
  def change
    create_table :patients do |t|
      t.integer :patient_id
      t.integer :age
      t.integer :submitter_id
      t.integer :publication_id

      t.timestamps
    end
  end
end
