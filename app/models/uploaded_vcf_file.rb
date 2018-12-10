class UploadedVcfFile < ApplicationRecord
  belongs_to :user, :optional => true
  belongs_to :patient, :optional => true
  belongs_to :pedia_service, :optional => true
end
