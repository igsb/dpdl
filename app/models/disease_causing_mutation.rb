class DiseaseCausingMutation < ApplicationRecord
  belongs_to :patient, :optional => true
end
