require 'rails_helper'

RSpec.describe "labs/index", type: :view do
  before(:each) do
    assign(:labs, [
      Lab.create!(
        :name => "Name",
        :email => "Email",
        :country => "Country",
        :contact => "Contact"
      ),
      Lab.create!(
        :name => "Name",
        :email => "Email",
        :country => "Country",
        :contact => "Contact"
      )
    ])
  end

  it "renders a list of labs" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Email".to_s, :count => 2
    assert_select "tr>td", :text => "Country".to_s, :count => 2
    assert_select "tr>td", :text => "Contact".to_s, :count => 2
  end
end
