class AddConsumerIdLabTable < ActiveRecord::Migration[5.1]
  def change
    add_column :labs, :api_consumer_id, :integer
    add_index :labs, [:lab_f2g_id, :api_consumer_id], unique: true
  end
end
