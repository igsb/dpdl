require 'test_helper'

class PrivaciesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @privacy = privacies(:one)
  end

  test "should get index" do
    get privacies_url
    assert_response :success
  end

  test "should get new" do
    get new_privacy_url
    assert_response :success
  end

  test "should create privacy" do
    assert_difference('Privacy.count') do
      post privacies_url, params: { privacy: {  } }
    end

    assert_redirected_to privacy_url(Privacy.last)
  end

  test "should show privacy" do
    get privacy_url(@privacy)
    assert_response :success
  end

  test "should get edit" do
    get edit_privacy_url(@privacy)
    assert_response :success
  end

  test "should update privacy" do
    patch privacy_url(@privacy), params: { privacy: {  } }
    assert_redirected_to privacy_url(@privacy)
  end

  test "should destroy privacy" do
    assert_difference('Privacy.count', -1) do
      delete privacy_url(@privacy)
    end

    assert_redirected_to privacies_url
  end
end
