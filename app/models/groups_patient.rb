class GroupsPatient < ApplicationRecord
  belongs_to :group, :optional => true
  belongs_to :patient, :optional => true
end