#Create a token, store it in db and send it back as a json object
class Api::AuthController < Api::BaseController
  def create
    key = ApiKey.create()
    respond_to do |format|
      format.json { render plain: {token: key.access_token}.to_json, status: 200, content_type: 'application/json'}
    end
  end
end
