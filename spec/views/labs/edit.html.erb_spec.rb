require 'rails_helper'

RSpec.describe "labs/edit", type: :view do
  before(:each) do
    @lab = assign(:lab, Lab.create!(
      :name => "MyString",
      :email => "MyString",
      :country => "MyString",
      :contact => "MyString"
    ))
  end

  it "renders the edit lab form" do
    render

    assert_select "form[action=?][method=?]", lab_path(@lab), "post" do

      assert_select "input[name=?]", "lab[name]"

      assert_select "input[name=?]", "lab[email]"

      assert_select "input[name=?]", "lab[country]"

      assert_select "input[name=?]", "lab[contact]"
    end
  end
end
