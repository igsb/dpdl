class CreateScoreProviders < ActiveRecord::Migration[5.1]
  def change
    create_table :score_providers do |t|
      t.integer :provider_id
      t.string :name, :limit => 36
      t.string :email, :limit => 256

      t.timestamps
    end
  end
end
