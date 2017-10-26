class ChangeColumnSubmitter < ActiveRecord::Migration[5.1]
  def change
    change_column :submitters, :name, :string, null: false
  end
end
