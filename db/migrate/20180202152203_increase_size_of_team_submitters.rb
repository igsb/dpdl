class IncreaseSizeOfTeamSubmitters < ActiveRecord::Migration[5.1]
  def up
    change_column :submitters, :team, :string, :limit => 64
  end

  def down
    change_column :submitters, :team, :string, :limit => 32
  end
end
