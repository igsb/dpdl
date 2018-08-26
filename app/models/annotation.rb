class Annotation < ApplicationRecord
  has_many :mutations_annotations, :dependent => :destroy
  has_many :mutations_positions, :through => :mutations_annotations
  belongs_to :clinical_significance, :optional => true
  belongs_to :review_status, :optional => true
  belongs_to :gene, :optional => true
  belongs_to :user, :optional => true
  belongs_to :disorder, :optional => true
  belongs_to :patients_vcf_file, optional: true

  validates :gene_id, :genotype, :clinical_significance, presence: true

  def new_annotation(params)
    @sig = params[:annotation][:sig_id]
    @hgvs = params[:annotation][:hgvs]
    @gene_name = params[:annotation][:gene_name]
    @gene_id = params[:annotation][:gene_id]
    @gene = Gene.find_by_entrez_id(@gene_id)
    @comment = params[:annotation][:comment]
    @genotype = params[:annotation][:genotype]
    @alt = params[:annotation][:alt]
    @p_vcf_id = params[:annotation][:p_vcf_id]

    errors = {}
    if @gene
      self.gene_id = @gene.id
    else
      errors['Gene'] = 'please check if the entrez ID is correct'
    end
    self.genotype = @genotype
    self.hgvs = @hgvs
    self.patients_vcf_file_id = @p_vcf_id
    self.comment = @comment
    self.clinical_significance_id = @sig
    self.score = ClinicalSignificance.find(@sig).value

    return errors
  end

  def update(params)
    @pos = params[:annotation][:pos]
    @sig = params[:annotation][:sig_id]
    @ref = params[:annotation][:ref]
    @hgvs = params[:annotation][:hgvs]
    @gene_name = params[:annotation][:gene_name]
    @gene_id = params[:annotation][:gene_id]
    @gene = Gene.find_by_entrez_id(@gene_id)
    @comment = params[:annotation][:comment]
    @genotype = params[:annotation][:genotype]
    @alt = params[:annotation][:alt]
    self.genotype = @genotype

    gene_errors = ''
    if @gene
      self.gene_id = @gene.id
    else
      gene_errors = 'please check if the entrez ID is correct'
    end
    self.hgvs = @hgvs
    self.comment = @comment
    self.clinical_significance_id = @sig
    self.score = ClinicalSignificance.find(@sig).value
    @p_vcf_id = params[:annotation][:p_vcf_id]

    return gene_errors
  end
end
