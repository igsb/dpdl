class Submitter < ApplicationRecord
  has_many :patient

  def self.parse_json(data)
    submitter = Submitter.find_or_create_by(name:data['user_name'], email:data['user_email'], team:data['team'])

    return submitter
  end
end
