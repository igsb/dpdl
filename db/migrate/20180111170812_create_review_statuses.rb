class CreateReviewStatuses < ActiveRecord::Migration[5.1]
  def change
    create_table :review_statuses do |t|
      t.string :name, :limit => 64

      t.timestamps
    end
  end
end
