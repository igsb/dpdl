class Api::BaseController < ApplicationController
  skip_before_action :authenticate_user!
  protect_from_forgery with: :null_session

  before_action :destroy_session

  def destroy_session
    request.session_options[:skip] = true
  end
end
