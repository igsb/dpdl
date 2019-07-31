require 'csv'
namespace :clean do
  desc "Rename gene"
  task :rename_gene => :environment do
    x = Gene.group(:entrez_id).having('count(entrez_id) > 1').count.keys
    x.each do |x_id|
      genes = Gene.where(entrez_id: x_id)
      old_g = genes[0]
      new_g = genes[1]
      # move genes_mutations
      old_genes_mutations = old_g.genes_mutations
      old_genes_mutations.each do |gm|
        gm.gene_id = new_g.id
        gm.save
      end
      puts 'genes_mutations done'

      # move pedia
      old_pedia = old_g.pedia
      old_pedia.each do |pedia|
        pedia.gene_id = new_g.id
        pedia.save
      end
      puts 'pedia done'

      # move disorder mutations
      old_disorders_score = old_g.disorders_mutations_scores
      old_disorders_score.each do |ds|
        ds.gene_id = new_g.id
        ds.save
      end
      puts 'disorders scores done'
      old_g.destroy
      puts 'old gene delete'
    end
    #MutationsPosition.includes(:disorders_mutations_scores).where(disorders_mutations_scores: {id: nil}).each do |mut_pos|
    #  mut_pos.position.destroy if not mut_pos.position.nil?
    #  mut_pos.mutation.destroy if not mut_pos.mutation.nil?
    #  mut_pos.destroy
    #end
  end
end
