class AddDefaultUploadedCountUserTable < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :uploaded_count, :integer, :default => 0
  end
end
