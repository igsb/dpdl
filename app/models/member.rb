# == Schema Information
#
# Table name: members
#
#  id         :integer         not null, primary key
#  user_id    :integer
#  group_id   :integer
#  created_at :datetime
#  updated_at :datetime
#
class Member < ActiveRecord::Base
   belongs_to :group
   belongs_to :user

   validates :user_id, :presence => true 
   validates :group_id, :presence => true	
   # avoid in memory duplicates. You will also need add unique index to db
   validates :user_id, :uniqueness => {:scope => [:user_id, :group_id]}	


end