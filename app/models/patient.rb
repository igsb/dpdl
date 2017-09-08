class Patient < ApplicationRecord
  belongs_to :submitter, :optional => true
  has_many :patients_features
  has_many :features, :through => :patients_features
  #self.primary_key = "last_name"
  #validates_uniqueness_of :last_name


  def self.parse_json(data, submitter)
    new_patient = Patient.find_or_create_by(case_id: data['case_id'], age: data['age'], submitter_id: submitter.id)
    return new_patient

  end
end
