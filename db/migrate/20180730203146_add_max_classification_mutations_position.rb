class AddMaxClassificationMutationsPosition < ActiveRecord::Migration[5.1]
  def change
    add_column :mutations_positions, :max_classification, :integer, :default => 0
  end
end
