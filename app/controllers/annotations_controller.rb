class AnnotationsController < ApplicationController
  before_action :set_annotation, only: [:show, :edit, :update, :destroy]
  before_action :check_access, only: [:show, :edit, :update, :destroy] 
  before_action :check_read_only, only: [:edit, :update, :destroy] 
  before_action :check_demo, only: [:index, :show, :edit, :update, :destroy] 

  # GET /annotations
  # GET /annotations.json
  def index
    user = current_user
    if not current_user.admin
      @annotations = user.annotations.order(:id).page(params[:page]).per(25)
    else
      @annotations = Annotation.order(:id).page(params[:page]).per(25)
    end
  end

  # GET /annotations/1
  # GET /annotations/1.json
  def show
    mut_pos = @annotation.mutations_positions.take
    @pos = 'chr' + VcfTools.chrom_to_s(mut_pos.position.chr) + ":" +  mut_pos.position.pos.to_s
    @ref = mut_pos.mutation.ref
    @alt = mut_pos.mutation.alt
    @gene_name = @annotation.gene.name
    @sig = @annotation.clinical_significance.name
    @updated_date = @annotation.updated_at
    p_vcf = @annotation.patients_vcf_file
    @patient = p_vcf.patient unless p_vcf.nil?

    if !@annotation.review_status.nil?
      @status = @annotation.review_status.name
    end
    if @annotation.user.username == 'Clinvar'
      @comment = 'SCV: ' + @annotation.scv + ', ClinVar version: ' + @annotation.version
    else
      @comment = @annotation.comment
    end
  end

  # GET /annotations/new
  def new
    @annotation = Annotation.new
    @pos = params[:pos]
    @sig = params[:sig]
    @ref = params[:ref]
    @hgvs = params[:hgvs]
    @p_vcf_id = params[:p_vcf_id]
    p_vcf = PatientsVcfFile.find(@p_vcf_id)
    @patient = p_vcf.patient unless p_vcf.nil?
    @mut_pos_id = params[:mut_pos_id]
    @gene = params[:gene]
    gene = Gene.find(@gene)
    @gene_name = gene.name
    @gene_id = gene.entrez_id
    @genotype = params[:genotype]
    tmp_genotype = @genotype.split('/')
    tmp_genotype.each do |tmp|
      if tmp != @ref
        @alt = tmp
      end
    end
  end

  # GET /annotations/1/edit
  def edit
    mut_pos = @annotation.mutations_positions.take
    @mut_pos_id = mut_pos.id
    @hgvs = @annotation.hgvs
    @pos = 'chr' +
           VcfTools.chrom_to_s(mut_pos.position.chr) +
           ':' + mut_pos.position.pos.to_s
    @ref = mut_pos.mutation.ref
    @alt = mut_pos.mutation.alt
    @gene_name = @annotation.gene.name
    @gene_id = @annotation.gene.entrez_id
    @genotype = @annotation.genotype
    @sig = @annotation.clinical_significance.name
    @updated_date = @annotation.updated_at
    status = @annotation.review_status
    @status = @annotation.review_status.name unless status.nil?
    @comment = if @annotation.user.username == 'Clinvar'
                 'SCV: ' +
                   @annotation.scv +
                   ', ClinVar version: ' +
                   @annotation.version
               else
                 @comment = @annotation.comment
               end
  end

  # POST /annotations
  # POST /annotations.json
  def create
    ActiveRecord::Base.transaction do
      @annotation = Annotation.new
      @annotation.user_id = current_user.id
      @pos = params[:annotation][:pos]
      @sig = params[:annotation][:sig_id]
      @ref = params[:annotation][:ref]
      @hgvs = params[:annotation][:hgvs]
      @gene_name = params[:annotation][:gene_name]
      @gene_id = params[:annotation][:gene_id]
      @comment = params[:annotation][:comment]
      @genotype = params[:annotation][:genotype]
      @alt = params[:annotation][:alt]
      errors = @annotation.new_annotation(params)
      @mut_pos_id = params[:annotation][:mut_pos_id]
      @mut_pos = MutationsPosition.find(@mut_pos_id)
      respond_to do |format|
        if @annotation.save
          @mut_pos.annotations << @annotation
          update_max(@mut_pos)
          msg = 'Annotation was successfully created.'
          format.html { redirect_to @annotation, notice: msg }
          format.json { render :show, status: :created, location: @annotation }
        else
          @annotation.errors[:error] << errors.values if errors.count.positive?
          errs = @annotation.errors
          format.html { render :new }
          format.json { render json: errs, status: :unprocessable_entity }
        end
      end
    end
  end

  # PATCH/PUT /annotations/1
  # PATCH/PUT /annotations/1.json
  def update
    ActiveRecord::Base.transaction do
      @annotation.user_id = current_user.id
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
      @annotation.genotype = @genotype

      gene_errors = ''
      if @gene
        @annotation.gene_id = @gene.id
      else
        gene_errors = 'please check if the entrez ID is correct'
      end
      @annotation.hgvs = @hgvs
      @annotation.comment = @comment
      @annotation.clinical_significance_id = @sig
      @mut_pos_id = params[:annotation][:mut_pos_id]
      @p_vcf_id = params[:annotation][:p_vcf_id]
      @mut_pos = MutationsPosition.find(@mut_pos_id)
      @annotation.score = ClinicalSignificance.find(@sig).value

      respond_to do |format|
        if @annotation.save
          @mut_pos.annotations << @annotation
          update_max(@mut_pos)
          msg = 'Annotation was successfully updated.'
          format.html { redirect_to @annotation, notice: msg }
          format.json { render :show, status: :created, location: @annotation }
        else
          if gene_errors
            @annotation.errors[:error] << gene_errors
          end
          format.html { render :new }
          format.json { render json: @annotation.errors, status: :unprocessable_entity }
        end
      end          
    end
  end

  # DELETE /annotations/1
  # DELETE /annotations/1.json
  def destroy
    mut_pos_arrays = []
    @annotation.mutations_positions.each do |mut|
      mut_pos_arrays.push(mut)
    end

    @annotation.destroy
    mut_pos_arrays.each do |mut_pos|
      update_max(mut_pos)
    end
    respond_to do |format|
      format.html { redirect_to annotations_url, notice: 'Annotation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_annotation
    @annotation = Annotation.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def annotation_params
    params.require(:annotation).permit(:annotation_id, :pos, :ref, :genotype, :class_id, :gene_id, :mut_pos_id, :vcf_id, :comment, :hgvs)
  end

  def check_access
    access = false
    if not current_user.admin
      user = current_user
      if user.annotations.exists?(@annotation.id)
        access = true
      end
    else
      access = true
    end

    if not access 
      flash[:alert] = 'You do not have permissions to enter this case!'
      redirect_back(fallback_location: root_path)
    end
  end

  def check_read_only
    if current_user.username == "demo"
      flash[:alert] = 'You do not have permissions to modify this case!'
      redirect_back(fallback_location: root_path)
    end
  end

  def check_demo
    @demo = false
    if current_user.username == "demo"
      @demo = true
    end
  end

  def update_max(mut_pos)
    max_score = mut_pos.annotations.maximum('score')
    puts max_score
    mut_pos.max_classification = max_score
    mut_pos.save
  end
end
