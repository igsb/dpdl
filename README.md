# DPDL

Deep Phenotyping for Deep Learning

## Description of the subfolders

* app
    - controllers
    - models
    - mailers, sending registration or approval emails
    - views, html files
    - assets, javascripts and scss files
* lib/tasks
    - tasks for import case from local folder or via lab api, import clinvar, and default settings
* db
    - migrate/, which is the folder for migration files, if you want to perform some changes you should run `rails g migration ...`. The file will be generated here.
    - schema.db, which descibe all tables in your database

## Installation
1. Install MySQL
1. Install Ruby on Rails with version higher than 5.0
1. Run `rails new ProjectName -d mysql`
1. There are some files with password which we didn't commit in github. To get all config files, you could do one of the following ways.
    - git clone dpdl project and copy everything into your project folder generated from last step.
    - You could also copy the files in config folder from the new project folder (ProjectName) to dpdl project folder.
1. Run `rake db:migrate` or `rake db:migrate RAILS_ENV=roduction` if you run on server mode to setup your database.
1. Run `rake bootstrap:all` or `rake bootstrap:all RAILS_ENV=production` to import all default settings.
1. Run `rails s` or `rails s -e production` to start your DPDL on your machine.
### Notes
* When you sign up a new account, it will send a registration email to your email account. If you don't have mail server in your machine, it could cause some errors. Therefore, you could comment the mail function in (app/mailers/admin_mailer.rb). Then you can use console mode to set your account as a admin or activate your account. Run `rails c` or `rails c -e production` to strat console. At first, find your account by `user = User.find_by_first_name(your_first_name)`. Then, activate your account by `user.approced = true`. You can set your account as admin by `user.admin = true`. In the end, don't forget run `user.save` to save every change.
* If you don't want to set up an account in your machine. You can comment the following lines to deactivate the permission controll.

```
In app/controllers/application_controller.rb
before_action :authenticate_user!
```

## Import Patient data and PEDIA results
There are two step for importing patient data. Firstly, we import the information from Face2Gene to DPDL via Amazon server or LAB api. Secondly, we upload the PEDIA results after we process the patieint by PEDIA approach.
1. There are two ways to import patient data.
    - Go to patient list page(http://www.dpdl.org/patients) and press new patient button. Upload the patient JSON file on http://www.dpdl.org/patients/new
    - Run "rake lab:get_case[Bonn,lab_id]" or "rake lab:get_case[Bonn,lab_id] RAILS_ENV=production" to upload patient data via LAB api.
1. Upload PEDIA results. 
    - Go to patient edit page and upload the 'case_id_pedia.json'. Then you will update the PEDIA scores of this patient.
    - Go to http://www.dpdl.org/vcf_files and upload the 'case_id.vcf.gz'. 
    - Go to http://www.dpdl.org/result_figures and upload the 'manhattan_case_id.png'
Once you upload everything, you will see the table for PEDIA score and manhattan plot and you can access the VCF viewer by pressing the button on patient page.
