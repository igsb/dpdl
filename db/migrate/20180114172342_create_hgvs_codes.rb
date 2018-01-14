class CreateHgvsCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :hgvs_codes do |t|
      t.string :code, :limit => 256

      t.timestamps
    end
  end
end
