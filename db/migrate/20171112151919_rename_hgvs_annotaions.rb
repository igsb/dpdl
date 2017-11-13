class RenameHgvsAnnotaions < ActiveRecord::Migration[5.1]
  def change
    remove_column :annotations, :hgvs_id
    add_column :annotations, :hgvs, :string
  end
end
