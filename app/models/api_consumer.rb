class ApiConsumer < ApplicationRecord
  has_secure_token :key
end
