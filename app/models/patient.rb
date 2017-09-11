class Patient < ApplicationRecord
  belongs_to :submitter, :optional => true
  has_many :patients_features
  has_many :features, :through => :patients_features, :dependent => :destroy
  has_many :patients_disorders
  has_many :disorders, :through => :patients_disorders, :dependent => :destroy

  validates :case_id, :submitter_id, presence: true
  validates :case_id, uniqueness: true

  def self.parse_json(data)
    #if Patient.where(case_id: data['case_id'])
    new_patient = Patient.new(case_id: data['case_id'], age: data['age'])

    return new_patient

  end
end
