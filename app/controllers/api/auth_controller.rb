#Create a token for the verified API user, store it in db and send it back as a json object
class Api::AuthController < Api::BaseController
  def create
    name = params[:user]
    key = params[:key]
    user = ApiConsumer.where(name: name).first
    if (user && user.key == key)
      key = ApiKey.create(api_consumer_id: user.id)
      respond_to do |format|
        msg = { token: key.access_token }
        format.json { render plain: msg.to_json,
                      status: 200,
                      content_type: 'application/json'
                    }
      end
    else
      respond_to do |format|
        msg = { msg: MSG_TOKEN_UNAUTHORIZED }
        format.json { render plain: msg.to_json,
                      status: 400,
                      content_type: 'application/json'
                    }
      end
    end
  end
end
