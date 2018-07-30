class AddScoreAnnotations < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :score, :integer, :default => 0
  end
end
