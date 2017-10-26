class DisordersController < ApplicationController
  before_action :set_disorder, only: [:show, :edit, :update, :destroy]

  # GET /disorders
  # GET /disorders.json
  def index
    @disorders = Disorder.all
  end

  # GET /disorders/1
  # GET /disorders/1.json
  def show
  end

  # GET /disorders/new
  def new
    @disorder = Disorder.new
  end

  # GET /disorders/1/edit
  def edit
  end

  # POST /disorders
  # POST /disorders.json
  def create
    @disorder = Disorder.new(disorder_params)

    respond_to do |format|
      if @disorder.save
        format.html { redirect_to @disorder, notice: 'Disorder was successfully created.' }
        format.json { render :show, status: :created, location: @disorder }
      else
        format.html { render :new }
        format.json { render json: @disorder.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /disorders/1
  # PATCH/PUT /disorders/1.json
  def update
    respond_to do |format|
      if @disorder.update(disorder_params)
        format.html { redirect_to @disorder, notice: 'Disorder was successfully updated.' }
        format.json { render :show, status: :ok, location: @disorder }
      else
        format.html { render :edit }
        format.json { render json: @disorder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /disorders/1
  # DELETE /disorders/1.json
  def destroy
    @disorder.destroy
    respond_to do |format|
      format.html { redirect_to disorders_url, notice: 'Disorder was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_disorder
      @disorder = Disorder.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def disorder_params
      params.require(:disorder).permit(:disorder_id, :disorder_name, :discription)
    end
end
