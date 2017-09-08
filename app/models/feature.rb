class Feature < ApplicationRecord
  has_many :cases_features
  has_many :patients, :through => :patients_features

  def self.parse_json(data)
    hpo_array = Array.new
    for hpo in data do
      hpo_result = Feature.find_or_create_by(hpo_term: hpo)
      hpo_array.push(hpo_result)
    end
    return hpo_array
  end
end
