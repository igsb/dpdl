class AnnotationsDbsnp < ApplicationRecord
  belongs_to :annotation, :optional => true
  belongs_to :dbsnp, :optional => true
end
