json.extract! user, :id, :last_name, :first_name, :institute, :title, :approved, :created_at, :updated_at
json.url user_url(user, format: :json)
