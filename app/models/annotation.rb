class Annotation < ApplicationRecord
  has_many :mutations_annotations
  has_many :mutations_positions, :through => :mutations_annotations
  belongs_to :clinical_significance, :optional => true
  belongs_to :review_status, :optional => true
  belongs_to :gene, :optional => true
  validates :scv, uniqueness: true
end
