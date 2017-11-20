Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }
  resources :users
  put 'activate/:id', to: 'users#activate', as: :activate_user
  put 'deactivate/:id', to: 'users#deactivate', as: :deactivate_user
  namespace :vcf_files do
      get 'pshow'
  end
  resources :vcf_files
  root :to => "home#index"
  resources :home
  resources :searches
  resources :disorders
  resources :features
  resources :patients
  resources :review
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
