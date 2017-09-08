class Patient < ApplicationRecord
  belongs_to :submitter, :optional => true
  has_many :patients_features
  has_many :features, :through => :patients_features, :dependent => :destroy
  has_many :patients_disorders
  has_many :disorders, :through => :patients_disorders, :dependent => :destroy


  def self.parse_json(data, submitter)
    #if Patient.where(case_id: data['case_id'])
    new_patient = Patient.find_or_create_by(case_id: data['case_id'], age: data['age'], submitter_id: submitter.id)

    return new_patient

  end
end
