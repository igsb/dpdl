class ResultFiguresController < ApplicationController
  before_action :set_result_figure, only: [:show, :edit, :update, :destroy]
  before_action :verify_is_admin

  # GET /result_figures
  # GET /result_figures.json
  def index
    @result_figures = ResultFigure.all
  end

  # GET /result_figures/1
  # GET /result_figures/1.json
  def show
  end

  # GET /result_figures/new
  def new
    @result_figure = ResultFigure.new
  end

  # GET /result_figures/1/edit
  def edit
  end

  # POST /result_figures
  # POST /result_figures.json
  def create
    name = params[:file].original_filename
    type = name.split('_')[0]
    patient = name.split('_')[1]
    patient_prefix = patient.split('.')[0]
    patient_id = Patient.find_by_case_id(patient_prefix.to_i).id
    type_id = FigureType.find_by_name(type).id
    path = File.join("Data", "images", name)
    File.open(path, "wb") { |f| f.write(params[:file].read) }
    flash[:notice] = "File uploaded"
    #redirect_to "new"
    @result_figure = ResultFigure.find_or_create_by(link: path, figure_type_id: type_id, patient_id: patient_id)

    respond_to do |format|
      if @result_figure.save
        format.html { redirect_to @result_figure, notice: 'Result figure was successfully created.' }
        format.json { render :show, status: :created, location: @result_figure }
      else
        format.html { render :new }
        format.json { render json: @result_figure.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /result_figures/1
  # PATCH/PUT /result_figures/1.json
  def update
    respond_to do |format|
      if @result_figure.update(result_figure_params)
        format.html { redirect_to @result_figure, notice: 'Result figure was successfully updated.' }
        format.json { render :show, status: :ok, location: @result_figure }
      else
        format.html { render :edit }
        format.json { render json: @result_figure.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /result_figures/1
  # DELETE /result_figures/1.json
  def destroy
    @result_figure.destroy
    respond_to do |format|
      format.html { redirect_to result_figures_url, notice: 'Result figure was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_result_figure
    @result_figure = ResultFigure.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def result_figure_params
    params.require(:result_figure).permit(:patient_id, :type, :link)
  end

  def verify_is_admin
    (current_user.nil?) ? redirect_to(root_path) : (redirect_to(root_path) unless current_user.admin?)
  end
end
