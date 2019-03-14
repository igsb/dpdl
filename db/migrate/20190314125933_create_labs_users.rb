class CreateLabsUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :labs_users do |t|
      t.integer :lab_id
      t.integer :user_id

      t.timestamps
    end
  end
end
