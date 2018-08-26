# frozen_string_literal: true

# AdminMailer is for sending registration email to user and admin
class AdminMailer < ApplicationMailer
  default from: 'contact@pedia-study.org'

  def welcome_email(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

  def new_user_waiting_for_approval(user)
    @user = user
    @url = 'https://pedia-study.org/users/sign_in'
    mail(to: @user.email,
         subject: "PEDIA-study Registration Request <#{user.email}>")
  end

  def new_registration(user)
    @user = user
    mail(to: 'contact@pedia-study.org',
         subject: "New registration <#{user.email} is waiting your approval>")
  end

  def new_user_got_approval(user)
    @user = user
    @url = 'https://pedia-study.org/users/sign_in'
    mail(to: @user.email,
         subject: "PEDIA-study account activated <#{user.email}>")
  end

  def new_user_remove_approval(user)
    @user = user
    @url = 'https://pedia-study.org/users/sign_in'
    mail(to: @user.email,
         subject: "PEDIA-study account deactivated <#{user.email}>")
  end
end
