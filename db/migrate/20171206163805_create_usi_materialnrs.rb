class CreateUsiMaterialnrs < ActiveRecord::Migration[5.1]
  def change
    create_table :usi_materialnrs do |t|
      t.integer :patient_id
      t.string :usi_id
      t.string :materialnr

      t.timestamps
    end
  end
end
