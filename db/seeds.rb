# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
case Rails.env
when "development"
  user = User.create!(username: 'FDNA',
                      password: 'FDNA1234',
                      password_confirmation: 'FDNA1234',
                      email: 'fdna@fdna.com',
                      approved: 1,
                      admin: 0,
                      created_at: Time.now.to_datetime,
                      updated_at: Time.now.to_datetime,
                      first_name: 'FDNA',
                      last_name: 'LAB',
                      institute: 'FDNA',
                      title: 'Mr.')
  user.save!
  user = User.create!(username: 'admin',
                      password: 'admin123',
                      password_confirmation: 'admin123',
                      email: 'admin@gmail.com',
                      approved: 1,
                      admin: 1,
                      created_at: Time.now.to_datetime,
                      updated_at: Time.now.to_datetime,
                      first_name: 'admin',
                      last_name: 'admin',
                      institute: 'uni bonn',
                      title: 'Dr.')
  user.save!
  lab = Lab.create(lab_f2g_id: 0, name: 'Face2Gene LAB')
  lab.save
end
