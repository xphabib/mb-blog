---
title: Rails Project Structure
date: 2026-05-12
excerpt: Rails project-এর গুরুত্বপূর্ণ folder এবং file।
---

নতুন Rails project বানালে অনেক folder দেখা যায়। শুরুতে সব বুঝতে হবে না। সবচেয়ে গুরুত্বপূর্ণ অংশগুলো আগে বুঝুন।

## app folder

Rails application code-এর মূল জায়গা।

```text
app/
  controllers/
  models/
  views/
  helpers/
  mailers/
  jobs/
```

## app/controllers

Controller browser request handle করে।

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.all
  end
end
```

## app/models

Model database table-এর সাথে কাজ করে।

```ruby
class Post < ApplicationRecord
end
```

## app/views

View HTML response তৈরি করে। Rails সাধারণত ERB template ব্যবহার করে।

```erb
<h1>Posts</h1>
```

## config/routes.rb

কোন URL কোন controller action-এ যাবে তা এখানে লেখা হয়।

```ruby
Rails.application.routes.draw do
  resources :posts
  root "posts#index"
end
```

## db/migrate

Database table change করার instruction migration file-এ থাকে।

```ruby
class CreatePosts < ActiveRecord::Migration[8.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.timestamps
    end
  end
end
```

## Gemfile

Project কোন Ruby gem ব্যবহার করবে তা এখানে থাকে।

```ruby
gem "rails"
gem "pg"
```

নতুন gem add করার পর সাধারণত চালাতে হয়:

```sh
bundle install
```

## config folder

Application configuration থাকে। শুরুতে বেশি edit করার দরকার হয় না, তবে routes file এখানে।

## public folder

Static file রাখা যায়, যেমন `404.html`, favicon, robots.txt।

## সহজ mental model

- URL define করবেন routes-এ
- request যাবে controller-এ
- data আসবে model থেকে
- user দেখবে view
- database change হবে migration দিয়ে

এই flow বুঝলে Rails project ঘুরে দেখা অনেক সহজ হয়।
