class ChangeColumnPhenotypicSeries < ActiveRecord::Migration[5.1]
  def change
    rename_column :phenotypic_series, :disorder_id, :title
    change_column :phenotypic_series, :title, :string, :limit => 128
  end
end
