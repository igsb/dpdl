Rails.application.routes.draw do
  resources :gfh, only: [:index]

  resources :labs
  get 'news', to: 'news#index'
  get 'profile', to: 'profile#index'

  resources :documents
  resources :imprints
  resources :privacies
  resources :pedia_services, only: [:index, :new, :create, :destroy]
  get 'pedia_services/monitor', to: 'pedia_services#monitor', as: :pedia_services_monitor
  get 'pedia_services/download', to: 'pedia_services#download', as: :pedia_services_download
  resources :result_figures
  devise_for :users, controllers: { registrations: 'users/registrations' }
  resources :users
  resources :users, only: [:index] do
    post :impersonate, on: :member
    post :stop_impersonating, on: :collection
  end
  put 'activate/:id', to: 'users#activate', as: :activate_user
  put 'deactivate/:id', to: 'users#deactivate', as: :deactivate_user
  get 'vcf_files/get_var', to: 'vcf_files#get_var', as: :vcf_files_get_var
  get :get_review, :controller => :review
  get '/get_img/:filename' => 'patients#get_img', :constraints => { :filename => /.*/ }
  get 'patients/download_file'
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
  resources :uploaded_vcf_files
  post '/annotations/new' => 'annotations#new', as: :annotations_new
  post '/patients/assign_user' => 'patients#assign_user', as: :patients_assign_user
  post '/labs/assign_user_to_lab' => 'labs#assign_user_to_lab', as: :labs_assign_user_to_lab
  post '/labs/remove_user' => 'labs#remove_user', as: :labs_remove_user

  namespace :api do
    resources :patients, only: [:create, :destroy]
    resources :auth ,only: [:create]
    resources :vcf_files, only: [:create, :destroy]
    get '/get_results/' => 'patients#get_results'
    get '/get_quality_report/' => 'vcf_files#get_quality_report'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
