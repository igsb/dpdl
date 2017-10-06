class CreatePhenotypicSeries < ActiveRecord::Migration[5.1]
  def change
    create_table :phenotypic_series do |t|
      t.integer :phenotypic_series_id
      t.integer :disorder_id

      t.timestamps
    end
  end
end
