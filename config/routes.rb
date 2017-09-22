Rails.application.routes.draw do
  root :to => "home#index"
  resources :home
  resources :searches
  resources :disorders
  resources :features
  resources :patients
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
