class CreateAnnotationsDbsnps < ActiveRecord::Migration[5.1]
  def change
    create_table :annotations_dbsnps do |t|
      t.integer :dbsnp_id
      t.integer :annotation_id

      t.timestamps
    end
  end
end
