class PatientsDisorder < ApplicationRecord
  belongs_to :patient, optional: true
  belongs_to :disorder, optional: true, :dependent => :destroy

  def self.add_relationship(patient, disorders_array)
    for disorder in disorders_array do
      puts 'fdjlfjdlfjldjfl'
      PatientsDisorder.create(:patient => patient, :disorder => disorder)
    end
  end

end
