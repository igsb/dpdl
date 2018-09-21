class AddJobIdPediaServices < ActiveRecord::Migration[5.1]
  def change
    add_column :pedia_services, :job_id, :integer
  end
end
