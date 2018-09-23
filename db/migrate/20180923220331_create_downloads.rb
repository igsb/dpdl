class CreateDownloads < ActiveRecord::Migration[5.1]
  def change
    create_table :downloads do |t|
      t.string :filename
      t.integer :user_id

      t.timestamps
    end
  end
end
