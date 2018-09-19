class Group < ActiveRecord::Base
  # destroy the relationship if group is deleted
  has_many :members, :dependent => :destroy
  has_many :users, :through => :members
  has_many :groups_patients, :dependent => :destroy
  has_many :patients, :through => :groups_patients
end
 