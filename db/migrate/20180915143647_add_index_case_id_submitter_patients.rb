class AddIndexCaseIdSubmitterPatients < ActiveRecord::Migration[5.1]
  def change
    add_index :patients, :case_id
    add_index :patients, :submitter_id
    add_index :patients, :result
  end
end
