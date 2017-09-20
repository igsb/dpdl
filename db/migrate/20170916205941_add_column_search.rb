class AddColumnSearch < ActiveRecord::Migration[5.1]
  def change
    add_column :searches, :value, :string, :limit => 32
    add_column :searches, :search_type_id, :integer
  end
end
