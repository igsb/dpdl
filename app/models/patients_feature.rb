class PatientsFeature < ApplicationRecord
  belongs_to :patient, optional: true
  belongs_to :feature, optional: true

end
