class CreateAnnotations < ActiveRecord::Migration[5.1]
  def change
    create_table :annotations do |t|
      t.integer :hgvs_id
      t.integer :classification_id

      t.timestamps
    end
  end
end
