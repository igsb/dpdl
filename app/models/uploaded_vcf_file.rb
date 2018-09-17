class UploadedVcfFile < ApplicationRecord
  belongs_to :user, :optional => true
  belongs_to :patient, :optional => true
end
