class CreateResultFigures < ActiveRecord::Migration[5.1]
  def change
    create_table :result_figures do |t|
      t.integer :patient_id
      t.integer :figure_type_id
      t.string :link

      t.timestamps
    end
  end
end
