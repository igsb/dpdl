class CreatePhenotypicSeriesDisorders < ActiveRecord::Migration[5.1]
  def change
    create_table :phenotypic_series_disorders do |t|
      t.integer :disorder_id
      t.integer :phenotypic_series_id

      t.timestamps
    end
  end
end
