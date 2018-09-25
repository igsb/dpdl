class PediaStatus < ApplicationRecord
  has_many :pedia_services

  validates :status, uniqueness: true

  INIT = 'Initiate PEDIA service'.freeze
  PRE_RUNNING = 'Preprocessing running'.freeze
  PRE_FAILED = 'Preprocessing failed'.freeze
  WORKFLOW_RUNNING = 'Workflow running'.freeze
  WORKFLOW_FAILED = 'Workflow failed'.freeze
  COMPLETE = 'Complete'.freeze
  UNKNOWN_FAILED = 'PEDIA failed. Unknown issue.'.freeze

  # Use for check if the service encountered unknown exception
  def normal_failed?
    is_failed = status == PRE_FAILED || status == WORKFLOW_FAILED
    return is_failed
  end

  def running?
    is_running = status == PRE_RUNNING ||
                 status == WORKFLOW_RUNNING ||
                 status == INIT
    return is_running
  end

  def pedia_failed?
    is_failed = status == PRE_FAILED ||
                status == WORKFLOW_FAILED ||
                status == UNKNOWN_FAILED
    return is_failed
  end

  def pedia_complete?
    is_complete = status == COMPLETE
    return is_complete
  end
end
