class PatientsFeature < ApplicationRecord
  belongs_to :patient, optional: true
  belongs_to :feature, optional: true

  def self.add_relationship(patient, features_array)
    for feature in features_array do
      PatientsFeature.create(:patient => patient, :feature => feature)
    end
  end

end
