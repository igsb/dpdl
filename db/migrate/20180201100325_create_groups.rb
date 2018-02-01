class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.string :group_name
      t.integer :administrator_id

      t.timestamps
    end
  end
end
