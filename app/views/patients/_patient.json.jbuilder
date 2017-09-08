json.extract! patient, :id, :last_name, :first_name, :case_id, :age, :submitter_id, :publication_id, :created_at, :updated_at
json.url patient_url(patient, format: :json)
