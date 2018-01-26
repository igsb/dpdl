require 'test_helper'

class PediaServicesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pedia_service = pedia_services(:one)
  end

  test "should get index" do
    get pedia_services_url
    assert_response :success
  end

  test "should get new" do
    get new_pedia_service_url
    assert_response :success
  end

  test "should create pedia_service" do
    assert_difference('PediaService.count') do
      post pedia_services_url, params: { pedia_service: {  } }
    end

    assert_redirected_to pedia_service_url(PediaService.last)
  end

  test "should show pedia_service" do
    get pedia_service_url(@pedia_service)
    assert_response :success
  end

  test "should get edit" do
    get edit_pedia_service_url(@pedia_service)
    assert_response :success
  end

  test "should update pedia_service" do
    patch pedia_service_url(@pedia_service), params: { pedia_service: {  } }
    assert_redirected_to pedia_service_url(@pedia_service)
  end

  test "should destroy pedia_service" do
    assert_difference('PediaService.count', -1) do
      delete pedia_service_url(@pedia_service)
    end

    assert_redirected_to pedia_services_url
  end
end
