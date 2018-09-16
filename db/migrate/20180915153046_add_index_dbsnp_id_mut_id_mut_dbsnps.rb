class AddIndexDbsnpIdMutIdMutDbsnps < ActiveRecord::Migration[5.1]
  def change
    add_index :mutations_dbsnps, [:mutations_position_id, :dbsnp_id]
  end
end
