class CreateFeatures < ActiveRecord::Migration[5.1]
  def change
    create_table :features do |t|
      t.string :hpo_term
      t.text :description

      t.timestamps
    end

    change_column :features, :hpo_term, :string, :limit => 16
  end
end
