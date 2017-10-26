class CreateSubmitters < ActiveRecord::Migration[5.1]
  def change
    create_table :submitters do |t|
      t.string :name
      t.string :email

      t.timestamps
    end

    change_column :submitters, :name, :string, :limit => 92
    change_column :submitters, :email, :string, :limit => 64
  end
end
