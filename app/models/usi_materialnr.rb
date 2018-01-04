class UsiMaterialnr < ApplicationRecord
  belongs_to :patient, :optional => true
end
