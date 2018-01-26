class CreatePediaServices < ActiveRecord::Migration[5.1]
  def change
    create_table :pedia_services do |t|

      t.timestamps
    end
  end
end
