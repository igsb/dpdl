class AddHgvsMutations < ActiveRecord::Migration[5.1]
  def change
    add_column :mutations, :hgvs, :string, :limit => 32
    change_column :mutations, :annotation, :integer
    rename_column :mutations, :annotation, :annotation_id
  end
end
