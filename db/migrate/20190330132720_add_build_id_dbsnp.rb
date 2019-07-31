class AddBuildIdDbsnp < ActiveRecord::Migration[5.1]
  def change
    add_column :dbsnps, :build, :string
  end
end
