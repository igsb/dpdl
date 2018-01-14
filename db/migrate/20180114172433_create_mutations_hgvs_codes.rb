class CreateMutationsHgvsCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :mutations_hgvs_codes do |t|
      t.integer :mutations_position_id
      t.integer :hgvs_code_id

      t.timestamps
    end
  end
end
