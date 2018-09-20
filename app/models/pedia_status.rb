class PediaStatus < ApplicationRecord
  has_many :pedia_services

  validates :status, uniqueness: true
end
