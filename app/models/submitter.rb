class Submitter < ApplicationRecord
  has_many :patient

  validates :last_name, presence: true
  validates :first_name, presence: true

end
