class ChangeColumnDisorders < ActiveRecord::Migration[5.1]
  def change
   add_column :disorders, :is_phenotypic_series, :boolean
   add_column :disorders, :disorder_type_id, :integer
  end
end
