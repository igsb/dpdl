class PediaServiceJob < ApplicationJob
  queue_as :default

  def perform(service)
    service.run_pedia
    # Do something later
  end
end
