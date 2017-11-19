class UserMailer < ApplicationMailer
  default from: 'la60312@gmail.com'

  def welcome_email(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: "la60312@gmail.com", subject: 'Welcome to My Awesome Site')
  end
end
