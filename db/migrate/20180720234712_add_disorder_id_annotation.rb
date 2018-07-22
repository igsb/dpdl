class AddDisorderIdAnnotation < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :disorder_id, :integer
  end
end
