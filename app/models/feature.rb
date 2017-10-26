class Feature < ApplicationRecord
  has_many :patients_features 
  has_many :patients, through: :patients_features, :dependent => :restrict_with_error

end
