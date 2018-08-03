class CreateApiConsumers < ActiveRecord::Migration[5.1]
  def change
    create_table :api_consumers do |t|
      t.string :key
      t.string :name
      
      t.timestamps
    end
    add_index :api_consumers, :key, unique: true
  end
end
