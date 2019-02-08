class CreateLabs < ActiveRecord::Migration[5.1]
  def change
    create_table :labs do |t|
      t.string :name
      t.string :email
      t.string :country
      t.string :contact

      t.timestamps
    end
  end
end
