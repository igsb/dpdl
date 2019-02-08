require 'rails_helper'

RSpec.describe "labs/new", type: :view do
  before(:each) do
    assign(:lab, Lab.new(
      :name => "MyString",
      :email => "MyString",
      :country => "MyString",
      :contact => "MyString"
    ))
  end

  it "renders new lab form" do
    render

    assert_select "form[action=?][method=?]", labs_path, "post" do

      assert_select "input[name=?]", "lab[name]"

      assert_select "input[name=?]", "lab[email]"

      assert_select "input[name=?]", "lab[country]"

      assert_select "input[name=?]", "lab[contact]"
    end
  end
end
