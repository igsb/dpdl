class AddIndexOmimIdDirsorders < ActiveRecord::Migration[5.1]
  def change
    add_index :disorders, :omim_id
  end
end
