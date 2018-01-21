class RemoveDisorderIdDisorderMutationTable < ActiveRecord::Migration[5.1]
  def up
    remove_column :disorders_mutations_scores, :disorder_id
  end

  def down
    add_column :disorders_mutations_scores, :disorder_id, :integer
  end
end
