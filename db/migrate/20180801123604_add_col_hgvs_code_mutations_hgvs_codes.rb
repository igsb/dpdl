class AddColHgvsCodeMutationsHgvsCodes < ActiveRecord::Migration[5.1]
  def change
    remove_column :mutations_hgvs_codes, :hgvs_code_id, :integer
    add_column :mutations_hgvs_codes, :hgvs_code, :string
    add_index :mutations_hgvs_codes, :mutations_position_id
  end
end
