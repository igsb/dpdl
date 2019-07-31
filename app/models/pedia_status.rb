class PediaStatus < ApplicationRecord
  has_many :pedia_services

  validates :status, uniqueness: true

  INIT = 'Initiate PEDIA service'.freeze
  PRE_RUNNING = 'Preprocessing running'.freeze
  PRE_FAILED = 'Preprocessing failed'.freeze
  WORKFLOW_RUNNING = 'Workflow running'.freeze
  WORKFLOW_FAILED = 'Workflow failed'.freeze
  COMPLETE = 'Complete'.freeze
  WORKFLOW_COMPLETE = 'Workflow complete'.freeze
  UPLOADING_RESULTS_SCORE_RUNNING = 'Uploading score running'.freeze
  UPLOADING_RESULTS_SCORE_COMPLETE = 'Uploading score complete'.freeze
  UPLOADING_RESULTS_SCORE_FAILED = 'Uploading score failed'.freeze
  UPLOADING_RESULTS_VCF_RUNNING = 'Uploading VCF running'.freeze
  UPLOADING_RESULTS_VCF_COMPLETE = 'Uploading VCF complete'.freeze
  UPLOADING_RESULTS_VCF_FAILED = 'Uploading VCF failed'.freeze
  UNKNOWN_FAILED = 'PEDIA failed. Unknown issue.'.freeze

  # Use for check if the service encountered unknown exception
  def normal_failed?
    return status == PRE_FAILED ||
           status == WORKFLOW_FAILED ||
           status == UPLOADING_RESULTS_VCF_FAILED ||
           status == UPLOADING_RESULTS_SCORE_FAILED
  end

  def workflow_running?
    return status == PRE_RUNNING ||
           status == WORKFLOW_RUNNING ||
           status == INIT
  end

  def workflow_failed?
    return status == PRE_FAILED ||
           status == WORKFLOW_FAILED ||
           status == UNKNOWN_FAILED
  end

  def pedia_failed?
    return status == PRE_FAILED ||
           status == WORKFLOW_FAILED ||
           status == UPLOADING_RESULTS_VCF_FAILED ||
           status == UPLOADING_RESULTS_SCORE_FAILED ||
           status == UNKNOWN_FAILED
  end

  # Return True if the workflow is completed
  # If the workflow is completed, then we can return the results via
  # rest api
  def workflow_complete?
    return status == WORKFLOW_COMPLETE ||
           status == UPLOADING_RESULTS_SCORE_RUNNING ||
           status == UPLOADING_RESULTS_SCORE_COMPLETE ||
           status == UPLOADING_RESULTS_VCF_RUNNING ||
           status == UPLOADING_RESULTS_VCF_COMPLETE ||
           status == COMPLETE
  end

  # Check if the whole pedia service is complete
  def pedia_complete?
    return status == COMPLETE
  end
end
