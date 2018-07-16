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
    @pos = 'chr' + mut_pos.position.chr.to_s + ":" +  mut_pos.position.pos.to_s
    @ref = mut_pos.mutation.ref
    @alt = mut_pos.mutation.alt
    @gene_name = @annotation.gene.name
    @sig = @annotation.clinical_significance.name
    @updated_date = @annotation.updated_at
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
    @vcf_id = params[:vcf_id]
    @mut_pos_id = params[:mut_pos_id]
    @gene = params[:gene]
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
      @gene = params[:annotation][:gene]
      @comment = params[:annotation][:comment]
      @genotype = params[:annotation][:genotype]
      @alt = params[:annotation][:alt]
      @annotation.genotype = @genotype
      @annotation.gene_id = @gene
      @annotation.hgvs = @hgvs
      @annotation.comment = @comment
      @annotation.clinical_significance_id = @sig
      @mut_pos = MutationsPosition.find(params[:annotation][:mut_pos_id])
      @mut_pos.annotations << @annotation
      @mut_pos
    end

    respond_to do |format|
      if @annotation.save
        format.html { redirect_to @annotation, notice: 'Annotation was successfully created.' }
        format.json { render :show, status: :created, location: @annotation }
      else
        format.html { render :new }
        format.json { render json: @annotation.errors, status: :unprocessable_entity }
      end
    end          
  end

  # PATCH/PUT /annotations/1
  # PATCH/PUT /annotations/1.json
  def update
  end

  # DELETE /annotations/1
  # DELETE /annotations/1.json
  def destroy
    @annotation.destroy
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
    params.require(:annotation).permit(:annotation_id, :pos, :ref, :genotype, :class_id, :gene_id, :mut_pos_id, :vcf_id, :comment)
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
end
