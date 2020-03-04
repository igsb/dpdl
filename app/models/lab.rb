class Lab < ApplicationRecord
  has_many :patients
  has_many :labs_users
  has_many :users, :through => :labs_users
  validates :lab_external_id, presence: true
  validates :api_consumer_id, presence: true
end
