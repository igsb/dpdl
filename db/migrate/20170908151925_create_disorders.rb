class CreateDisorders < ActiveRecord::Migration[5.1]
  def change
    create_table :disorders do |t|
      t.integer :disorder_id
      t.string :disorder_name
      t.text :discription

      t.timestamps
    end

    change_column :disorders, :disorder_name, :string, :limit => 32
  end
end
