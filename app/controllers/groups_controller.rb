class GroupsController < ApplicationController
  before_action :check_access
  before_action :set_group, only: [:show, :edit, :update, :destroy]
  after_action :assign_group_patients ,only: [:create, :update]
  
  def index
    @groups = Group.order(:id).page(params[:page]).per(25)
  end
  
  # PATCH/PUT /groups/1
  def update
    new_grp_name = params[:group]['name']
    new_members = params[:users]
    remove_members = params[:members]

    ActiveRecord::Base.transaction do
      @group.name = new_grp_name
      if new_members
        new_members.each do |m|
          user = User.where(id:m).first
          Member.create(user_id: user.id, group_id: @group.id)
        end
      end
      
      if remove_members
         remove_members.each do |mem|
          user = User.where(id:mem).first
          Member.where(user_id:user.id).where(group_id:@group.id).destroy_all
        end
      end
    end  
    respond_to do |format|
      if @group.save
        format.html { redirect_to @group, notice: 'Group was Updated successfully.' }
      else
        format.html { render :new }
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end   
  end
    
  # GET /groups/new
  def new
    @groups = Group.new
    @users = User.all
  end
  
  def create
    grp_name = params[:name]
    members = params[:users]
    puts members
    ActiveRecord::Base.transaction do
      @group = Group.create(name: grp_name)
      members.each do |m|
        user = User.where(id:m).first
        Member.create(user_id: user.id, group_id: @group.id)
      end
    end
    respond_to do |format|
      if @group.save
        format.html { redirect_to @group, notice: 'Group was successfully created.' }
        
      else
        format.html { render :new }
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end          
  end
  
  def show
    
  end
  
    # GET /patients/1/edit
  def edit
    @users = User.all
    @members = @group.users
  end
  
  
  def destroy 
    @group.destroy
    respond_to do |format|
      format.html { redirect_to groups_url, notice: 'Group was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  
  
  private
  
  def set_group
    @group = Group.find(params[:id])
  end


  def check_access
   #(current_user.nil?) ? redirect_to(root_path) : (redirect_to(root_path) unless current_user.admin?)
    if not current_user.admin
      flash[:alert] = 'You do not have access to this page!'
      redirect_to action: "home#index"
    else
      
    end
  end
  
  def assign_group_patients
    # This automatically creates the UserGroup record
    user = @group.users
    user.each do |u|
      email = u.email
      submitter = Submitter.find_by_email(email)
      if submitter != nil
        submitter.patient.each do |patient|
          if not @group.patients.exists?(patient.id)
            @group.patients << patient
          end
        end
      end
    end
  end
end
