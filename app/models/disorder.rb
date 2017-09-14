class Disorder < ApplicationRecord
  has_many :patients_disorders
  has_many :patients, :through => :patients_disorders, :dependent => :restrict_with_error

  #validates :disorder_id, uniqueness: true, presence: true
end
