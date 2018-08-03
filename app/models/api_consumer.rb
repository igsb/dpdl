class ApiConsumer < ApplicationRecord
  has_secure_token :key
  has_many :api_keys
end
