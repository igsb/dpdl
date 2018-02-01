class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable
  has_many :vcf_files
  has_many :users_groups
  has_many :groups, :through => :users_groups
  after_create :send_admin_mail
  validates :institute, :presence => true
  validates :last_name, :presence => true
  validates :first_name, :presence => true
  validates :username,
    :presence => true,
    :uniqueness => {
    :case_sensitive => false
    }

  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true
  attr_accessor :login
  validate :validate_username
  after_create :assign_default_group

 
  def validate_username
    if User.where(email: username).exists?
      errors.add(:username, :invalid)
    end
  end

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

  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
      if conditions[:username].nil?
        where(conditions).first
      else
        where(username: conditions[:username]).first
      end
    end
  end

  private
 
  def assign_default_group
    # This automatically creates the UserGroup record
    name = self.first_name + ' ' + self.last_name
    self.groups << Group.find_or_create_by(group_name:name, administrator_id: self.id)
  end
end
