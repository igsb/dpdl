class ChangeGenotypeToText < ActiveRecord::Migration[5.1]
  def self.up
    change_column :annotations, :genotype, :text
  end

  def self.down
    change_column :annotations, :genotype, :string
  end

end
