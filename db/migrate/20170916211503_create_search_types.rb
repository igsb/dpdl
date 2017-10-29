class CreateSearchTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :search_types do |t|
      t.string :type_name

      t.timestamps
    end
  end
end
