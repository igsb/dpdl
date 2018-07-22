require 'csv'
namespace :clean do
  desc "Remove unused position mutation"
  task :rm_mut_pos => :environment do
    MutationsPosition.includes(:disorders_mutations_scores).where(disorders_mutations_scores: {id: nil}).each do |mut_pos|
      mut_pos.position.destroy if not mut_pos.position.nil?
      mut_pos.mutation.destroy if not mut_pos.mutation.nil?
      mut_pos.destroy
    end
  end
end
