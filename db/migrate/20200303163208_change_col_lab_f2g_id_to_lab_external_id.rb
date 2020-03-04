class ChangeColLabF2gIdToLabExternalId < ActiveRecord::Migration[5.1]
  def change
    rename_column :labs, :lab_f2g_id, :lab_external_id
  end
end
