require 'test_helper'

class VcfFilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @vcf_file = vcf_files(:one)
  end

  test "should get index" do
    get vcf_files_url
    assert_response :success
  end

  test "should get new" do
    get new_vcf_file_url
    assert_response :success
  end

  test "should create vcf_file" do
    assert_difference('VcfFile.count') do
      post vcf_files_url, params: { vcf_file: {  } }
    end

    assert_redirected_to vcf_file_url(VcfFile.last)
  end

  test "should show vcf_file" do
    get vcf_file_url(@vcf_file)
    assert_response :success
  end

  test "should get edit" do
    get edit_vcf_file_url(@vcf_file)
    assert_response :success
  end

  test "should update vcf_file" do
    patch vcf_file_url(@vcf_file), params: { vcf_file: {  } }
    assert_redirected_to vcf_file_url(@vcf_file)
  end

  test "should destroy vcf_file" do
    assert_difference('VcfFile.count', -1) do
      delete vcf_file_url(@vcf_file)
    end

    assert_redirected_to vcf_files_url
  end
end
