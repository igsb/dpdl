class CreateClinicalSignificances < ActiveRecord::Migration[5.1]
  def change
    create_table :clinical_significances do |t|
      t.string :name, :limit => 64

      t.timestamps
    end
  end
end
