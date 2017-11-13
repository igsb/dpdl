class Mutation < ApplicationRecord
  has_many :mutations_positions
  has_many :positions, :through => :mutations_positions
end
