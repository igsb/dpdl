class AddTitleSubmittersTable < ActiveRecord::Migration[5.1]
  def change
    add_column :submitters, :title, :string, :limit => 10
  end
end
