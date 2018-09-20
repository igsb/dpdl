class CreatePediaStatuses < ActiveRecord::Migration[5.1]
  def change
    create_table :pedia_statuses do |t|
      t.string :status

      t.timestamps
    end
  end
end
