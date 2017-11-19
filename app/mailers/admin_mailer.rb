class AdminMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def welcome_email(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

  def new_user_waiting_for_approval(user)
    @user = user
    mail(to: "la60312@gmail.com", 
         subject: "Registration Request  <#{user.email}>")
  end
end
