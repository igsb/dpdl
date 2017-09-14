class Submitter < ApplicationRecord
  has_many :patient

  validates :name, uniqueness: true, presence: true

end
