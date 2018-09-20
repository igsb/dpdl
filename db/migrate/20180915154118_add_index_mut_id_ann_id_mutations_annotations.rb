class AddIndexMutIdAnnIdMutationsAnnotations < ActiveRecord::Migration[5.1]
  def change
    add_index :mutations_annotations, [:mutations_position_id, :annotation_id], name: :idx_mutations_annotations_mut_pos_ann_id
  end
end
