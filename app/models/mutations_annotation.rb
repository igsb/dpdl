class MutationsAnnotation < ApplicationRecord
  belongs_to :annotation, :optional => true
  belongs_to :mutations_position, :optional => true
end
