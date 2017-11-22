require 'test_helper'

class ResultFiguresControllerTest < ActionDispatch::IntegrationTest
  setup do
    @result_figure = result_figures(:one)
  end

  test "should get index" do
    get result_figures_url
    assert_response :success
  end

  test "should get new" do
    get new_result_figure_url
    assert_response :success
  end

  test "should create result_figure" do
    assert_difference('ResultFigure.count') do
      post result_figures_url, params: { result_figure: { link: @result_figure.link, patient_id: @result_figure.patient_id, type: @result_figure.type } }
    end

    assert_redirected_to result_figure_url(ResultFigure.last)
  end

  test "should show result_figure" do
    get result_figure_url(@result_figure)
    assert_response :success
  end

  test "should get edit" do
    get edit_result_figure_url(@result_figure)
    assert_response :success
  end

  test "should update result_figure" do
    patch result_figure_url(@result_figure), params: { result_figure: { link: @result_figure.link, patient_id: @result_figure.patient_id, type: @result_figure.type } }
    assert_redirected_to result_figure_url(@result_figure)
  end

  test "should destroy result_figure" do
    assert_difference('ResultFigure.count', -1) do
      delete result_figure_url(@result_figure)
    end

    assert_redirected_to result_figures_url
  end
end
