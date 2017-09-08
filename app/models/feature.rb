class Feature < ApplicationRecord
  has_many :patients_features 
  has_many :patients, through: :patients_features, :dependent => :restrict_with_error


  def self.parse_json(data)
    hpo_array = Array.new
    for hpo in data do
      hpo_result = Feature.find_or_create_by(hpo_term: hpo)
      hpo_array.push(hpo_result)
    end
    return hpo_array
  end
end
