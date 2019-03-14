class LabsController < ApplicationController
  before_action :set_lab, only: [:show, :edit, :update, :destroy]
  before_action :verify_is_admin

  # GET /labs
  # GET /labs.json
  def index
    @labs = Lab.all
  end

  # GET /labs/1
  # GET /labs/1.json
  def show
    @labs_users = @lab.labs_users
  end

  # GET /labs/new
  def new
    @lab = Lab.new
  end

  # GET /labs/1/edit
  def edit
  end

  # POST /labs
  # POST /labs.json
  def create
    @lab = Lab.new(lab_params)

    respond_to do |format|
      if @lab.save
        format.html { redirect_to @lab, notice: 'Lab was successfully created.' }
        format.json { render :show, status: :created, location: @lab }
      else
        format.html { render :new }
        format.json { render json: @lab.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /labs/1
  # PATCH/PUT /labs/1.json
  def update
    respond_to do |format|
      if @lab.update(lab_params)
        format.html { redirect_to @lab, notice: 'Lab was successfully updated.' }
        format.json { render :show, status: :ok, location: @lab }
      else
        format.html { render :edit }
        format.json { render json: @lab.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /labs/1
  # DELETE /labs/1.json
  def destroy
    @lab.destroy
    respond_to do |format|
      format.html { redirect_to labs_url, notice: 'Lab was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def remove_user
    lab_user = LabsUser.find(params[:id])
    lab = lab_user.lab
    lab_user.destroy
    respond_to do |format|
      format.html { redirect_to lab, notice: 'User was successfully removed.' }
      format.json { head :no_content }
    end
  end

  def assign_user_to_lab
    username = params[:assign_user_to_lab][:username]
    id = params[:id]
    @lab = Lab.find(id)
    user = User.find_by_username(username)
    if user.nil?
      respond_to do |format|
        flash[:notice] = 'User not found! Please check username.'
        format.html { render :edit }
      end
    else
      if @lab.users.exists?(user.id)
        respond_to do |format|
          flash[:notice] = 'Lab already has this user.'
          format.html { render :edit }
        end
      else
        respond_to do |format|
          @lab.users << user
          format.html { redirect_to @lab, notice: 'User was successfully updated.' }
          format.json { render :show, status: :ok, location: @lab }
        end
      end
    end
  end
  private
  # Use callbacks to share common setup or constraints between actions.
  def set_lab
    @lab = Lab.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def lab_params
    params.require(:lab).permit(:name, :email, :country, :contact)
  end

  def verify_is_admin
    (current_user.nil?) ? redirect_to(root_path) : (redirect_to(root_path) unless current_user.admin? or true_user.admin?)
  end
end
