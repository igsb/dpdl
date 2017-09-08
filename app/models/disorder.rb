class Disorder < ApplicationRecord
  has_many :patients_disorders
  has_many :patients, :through => :patients_disorders, :dependent => :restrict_with_error

  def self.parse_json(data)
    disorder_array = Array.new
    if data.kind_of?(Array)
      # To do
      # Handle multiple disorders
    else
      if data['omim_id'].kind_of?(Array)
        # Have several omim id in a disorder. Maybe it is becasue the subtypes
        # To do:
        # We should deal with the subtypes because the syndrome name will be the same.
        omims = data['omim_id']
        for omim in omims
          disorder_result = Disorder.find_or_create_by(disorder_id: omim)
          disorder_result.disorder_name = data['syndrome_name']
          disorder_result.save
          disorder_array.push(disorder_result)
        end
      else
        disorder_result = Disorder.find_or_create_by(disorder_id: data['omim_id'], disorder_name: data['syndrome_name'])
        disorder_array.push(disorder_result)
      end
    end
    return disorder_array
  end

end
