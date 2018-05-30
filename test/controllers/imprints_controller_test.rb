require 'test_helper'

class ImprintsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @imprint = imprints(:one)
  end

  test "should get index" do
    get imprints_url
    assert_response :success
  end

  test "should get new" do
    get new_imprint_url
    assert_response :success
  end

  test "should create imprint" do
    assert_difference('Imprint.count') do
      post imprints_url, params: { imprint: {  } }
    end

    assert_redirected_to imprint_url(Imprint.last)
  end

  test "should show imprint" do
    get imprint_url(@imprint)
    assert_response :success
  end

  test "should get edit" do
    get edit_imprint_url(@imprint)
    assert_response :success
  end

  test "should update imprint" do
    patch imprint_url(@imprint), params: { imprint: {  } }
    assert_redirected_to imprint_url(@imprint)
  end

  test "should destroy imprint" do
    assert_difference('Imprint.count', -1) do
      delete imprint_url(@imprint)
    end

    assert_redirected_to imprints_url
  end
end
