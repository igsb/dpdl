class AddVersionScores < ActiveRecord::Migration[5.1]
  def change
    add_column :scores, :version, :string, :limit => 16
  end
end
