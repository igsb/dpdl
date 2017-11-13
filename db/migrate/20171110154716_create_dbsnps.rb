class CreateDbsnps < ActiveRecord::Migration[5.1]
  def change
    create_table :dbsnps do |t|
      t.string :snp_id

      t.timestamps
    end
  end
end
