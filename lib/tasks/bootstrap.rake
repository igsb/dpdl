namespace :bootstrap do
  desc "Add the default types"
  task :default_type => :environment do
    SearchType.create( :type_name => 'HPO' )
    SearchType.create( :type_name => 'OMIM' )
    SearchType.create( :type_name => 'Case id' )
  end

  desc "Run all bootstrapping tasks"
  task :all => [:default_type]
end
