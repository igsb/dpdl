json.extract! vcf_file, :id, :created_at, :updated_at
json.url vcf_file_url(vcf_file, format: :json)
