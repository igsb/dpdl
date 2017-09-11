class PatientsDisorder < ApplicationRecord
  belongs_to :patient, optional: true
  belongs_to :disorder, optional: true, :dependent => :destroy

end
