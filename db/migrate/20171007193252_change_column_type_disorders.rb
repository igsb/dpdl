class ChangeColumnTypeDisorders < ActiveRecord::Migration[5.1]
  def change
    change_column_default :disorders, :is_phenotypic_series, from: true, to: false
  end
end
