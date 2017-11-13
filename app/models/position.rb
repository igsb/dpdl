class Position < ApplicationRecord
  has_many :mutations
  has_many :mutations_positions, :through => :mutations
  belongs_to :reference, :optional => true
end
