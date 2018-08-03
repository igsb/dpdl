class AddMembersUniquenessIndex < ActiveRecord::Migration[5.1]
 def self.up
  	add_index :members, [:group_id,:user_id], :unique => true
  end

  def self.down
 	remove_index :members, [:group_id,:user_id]
   end
end
