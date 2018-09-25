class AddOmimFdnaPhenotypicSeriesDis < ActiveRecord::Migration[5.1]
  def change
    add_column :phenotypic_series_disorders, :omim, :boolean, default: false
    add_column :phenotypic_series_disorders, :fdna, :boolean, default: false
  end
end
