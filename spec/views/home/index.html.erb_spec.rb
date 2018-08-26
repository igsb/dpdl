require 'rails_helper'

RSpec.describe "home/index", :type => :view do
  it 'render home' do
    render :template => "home/index.html.erb" 
    expect(rendered).to include('News')
    expect(rendered).to include('https://docs.google.com/presentation/')
  end
end
