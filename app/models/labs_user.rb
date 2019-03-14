class LabsUser < ApplicationRecord
  belongs_to :lab, optional: true
  belongs_to :user, optional: true
end
