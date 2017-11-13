class RemoveHgvsAnnotationColMutations < ActiveRecord::Migration[5.1]
  def change
    remove_column :mutations, :annotation_id
    remove_column :mutations, :hgvs
  end
end
