# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
Rails.application.config.assets.precompile += %w( admin.js admin.css )
Rails.application.config.assets.precompile += %w( dropit.css )
Rails.application.config.assets.precompile += %w( ui-grid.min.css )
Rails.application.config.assets.precompile += %w( ui-grid.min.js )
Rails.application.config.assets.precompile += %w( dropit.js )
Rails.application.config.assets.precompile += %w( review.css )
Rails.application.config.assets.precompile += %w( vcf_show.css )
Rails.application.config.assets.precompile += %w( show_table.js )
Rails.application.config.assets.precompile += %w( pedia_manhattan.js )
