require 'test_helper'

class DisordersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @disorder = disorders(:one)
  end

  test "should get index" do
    get disorders_url
    assert_response :success
  end

  test "should get new" do
    get new_disorder_url
    assert_response :success
  end

  test "should create disorder" do
    assert_difference('Disorder.count') do
      post disorders_url, params: { disorder: { discription: @disorder.discription, disorder_id: @disorder.disorder_id, disorder_name: @disorder.disorder_name } }
    end

    assert_redirected_to disorder_url(Disorder.last)
  end

  test "should show disorder" do
    get disorder_url(@disorder)
    assert_response :success
  end

  test "should get edit" do
    get edit_disorder_url(@disorder)
    assert_response :success
  end

  test "should update disorder" do
    patch disorder_url(@disorder), params: { disorder: { discription: @disorder.discription, disorder_id: @disorder.disorder_id, disorder_name: @disorder.disorder_name } }
    assert_redirected_to disorder_url(@disorder)
  end

  test "should destroy disorder" do
    assert_difference('Disorder.count', -1) do
      delete disorder_url(@disorder)
    end

    assert_redirected_to disorders_url
  end
end
