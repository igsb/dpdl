class Lab < ApplicationRecord
  has_many :patients
  has_many :labs_users
  has_many :users, :through => :labs_users
end
