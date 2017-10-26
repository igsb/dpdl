class AddColumnUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.integer :uploaded_count
      t.string :username

      t.timestamps
    end
  end
end
