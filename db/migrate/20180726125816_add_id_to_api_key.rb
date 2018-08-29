class AddIdToApiKey < ActiveRecord::Migration[5.1]
  def change
    add_column :api_keys, :api_consumer_id, :integer
  end
end
