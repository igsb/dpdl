class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable
  has_many :vcf_files
  after_create :send_admin_mail
  validates :institute, :presence => true
  validates :last_name, :presence => true
  validates :first_name, :presence => true
  attr_accessor :login

  def active_for_authentication? 
    super && approved? 
  end 

  def inactive_message 
    if !approved? 
      :not_approved 
    else 
      super # Use whatever other message 
    end 
  end

  def send_admin_mail
    AdminMailer.new_user_waiting_for_approval(self).deliver
    AdminMailer.new_registration(self).deliver
  end
end
