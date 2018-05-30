class CreateImprints < ActiveRecord::Migration[5.1]
  def change
    create_table :imprints do |t|

      t.timestamps
    end
  end
end
