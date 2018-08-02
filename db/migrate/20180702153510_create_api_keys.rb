class CreateApiKeys < ActiveRecord::Migration[5.1]
  def change
    create_table :api_keys do |t|
      t.string :access_token
      t.datetime :expires_at

      t.timestamps
    end
    add_index :api_keys, ["access_token"], name: "index_api_keys_on_access_token", unique: true
  end
end
