class Annotation < ApplicationRecord
  has_many :mutations_annotations, :dependent => :destroy
  has_many :mutations_positions, :through => :mutations_annotations
  belongs_to :clinical_significance, :optional => true
  belongs_to :review_status, :optional => true
  belongs_to :gene, :optional => true
  belongs_to :user, :optional => true
  belongs_to :disorder, :optional => true

  validates :gene_id, :genotype, :clinical_significance, presence: true
end
