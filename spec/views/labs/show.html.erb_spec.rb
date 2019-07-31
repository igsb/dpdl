require 'rails_helper'

RSpec.describe "labs/show", type: :view do
  before(:each) do
    @lab = assign(:lab, Lab.create!(
      :name => "Name",
      :email => "Email",
      :country => "Country",
      :contact => "Contact"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Email/)
    expect(rendered).to match(/Country/)
    expect(rendered).to match(/Contact/)
  end
end
