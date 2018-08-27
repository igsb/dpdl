Rails.application.routes.draw do
  get 'news', to: 'news#index'
  get 'profile', to: 'profile#index'

  resources :documents
  resources :imprints
  resources :privacies
  resources :pedia_services, only: [:index, :new, :create, :destroy]
  resources :result_figures
  devise_for :users, controllers: { registrations: 'users/registrations' }
  resources :users
  resources :users, only: [:index] do
    post :impersonate, on: :member
    post :stop_impersonating, on: :collection
  end
  put 'activate/:id', to: 'users#activate', as: :activate_user
  put 'deactivate/:id', to: 'users#deactivate', as: :deactivate_user
  get 'vcf_files/get_var/:id', to: 'vcf_files#get_var', as: :vcf_files_get_var 
  get :get_review, :controller => :review
  get '/get_img/:filename' => 'patients#get_img', :constraints => { :filename => /.*/ }
  resources :vcf_files
  root :to => "home#index"
  resources :home
  resources :about
  resources :contact
  resources :searches
  resources :disorders
  resources :features
  resources :patients
  resources :review
  resources :annotations
  post '/annotations/new' => 'annotations#new', as: :annotations_new 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
