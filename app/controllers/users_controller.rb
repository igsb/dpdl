class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :verify_is_admin

  def index
    if params[:approved] == "false"
      @users = User.where(approved: false)
    else
      @users = User.all
    end
  end

  def show
  end

  # GET /user/1/edit
  def edit
  end


  # PATCH/PUT /user/1
  # PATCH/PUT /user/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def activate
    @user = User.find(params[:id])
    @user.update_attribute(:approved, true)
    flash[:notice] = 'This account is activated'

    AdminMailer.new_user_got_approval(@user).deliver
    redirect_to users_url
  end

  def deactivate
    @user = User.find(params[:id])
    @user.update_attribute(:approved, false)
    flash[:notice] = 'This account is deactivated'

    AdminMailer.new_user_remove_approval(@user).deliver
    redirect_to users_url
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def impersonate
    user = User.find(params[:id])
    impersonate_user(user)
    redirect_to root_path
  end

  def stop_impersonating
    stop_impersonating_user
    redirect_to root_path
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:user_id, :institute, :last_name, :first_name, :title, :approved, :username, :admin)
  end

  def verify_is_admin
    (current_user.nil?) ? redirect_to(root_path) : (redirect_to(root_path) unless current_user.admin? or true_user.admin?)
  end

end
