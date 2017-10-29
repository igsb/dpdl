class DisordersScore < ApplicationRecord
  belongs_to :score, optional: true
  belongs_to :disorder, optional: true, :dependent => :destroy

end
