class DocumentsController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    # Show document index page
  end
end
