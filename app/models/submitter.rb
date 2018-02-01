class Submitter < ApplicationRecord
  has_many :patient

  validates :last_name, uniqueness: true, presence: true
  validates :first_name, uniqueness: true, presence: true

end
