class CreateFigureTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :figure_types do |t|
      t.string :name, :limit => 12

      t.timestamps
    end
  end
end
