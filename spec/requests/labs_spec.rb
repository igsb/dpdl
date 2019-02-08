require 'rails_helper'

RSpec.describe "Labs", type: :request do
  describe "GET /labs" do
    it "works! (now write some real specs)" do
      get labs_path
      expect(response).to have_http_status(200)
    end
  end
end
