class AdminMailer < ApplicationMailer
  default from: 'contact@dpdl.org'

  def welcome_email(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

  def new_user_waiting_for_approval(user)
    @user = user
    @url  = 'http://dpdl.org/users/sign_in'
    mail(to: @user.email, 
         subject: "DPDL Registration Request  <#{user.email}>")
  end

  def new_registration(user)
    @user = user
    mail(to: 'contact@dpdl.org', subject: "New registration <#{user.email} is waiting your approval>")
  end

  def new_user_got_approval(user)
    @user = user
    @url  = 'http://dpdl.org/users/sign_in'
    mail(to: @user.email, 
         subject: "DPDL account activated  <#{user.email}>")
  end

  def new_user_remove_approval(user)
    @user = user
    @url  = 'http://dpdl.org/users/sign_in'
    mail(to: @user.email, 
         subject: "DPDL account deactivated  <#{user.email}>")
  end
end
