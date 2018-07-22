class ChangeCommentToText < ActiveRecord::Migration[5.1]
  def self.up
    change_column :annotations, :comment, :text
  end

  def self.down
    change_column :annotations, :comment, :string
  end

end
