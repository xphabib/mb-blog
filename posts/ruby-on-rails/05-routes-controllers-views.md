---
title: Routes, Controllers, Views
date: 2026-05-11
excerpt: URL থেকে HTML response পর্যন্ত Rails request flow।
---

Rails app-এ user browser থেকে একটি URL open করে। Rails routes দেখে ঠিক করে request কোন controller action-এ যাবে।

## Route লেখা

`config/routes.rb`:

```ruby
Rails.application.routes.draw do
  get "/about", to: "pages#about"
  root "pages#home"
end
```

এখানে `/about` URL গেলে `PagesController`-এর `about` action চলবে।

## Controller তৈরি

```sh
bin/rails generate controller Pages home about
```

এতে controller এবং view তৈরি হবে।

Controller:

```ruby
class PagesController < ApplicationController
  def home
  end

  def about
  end
end
```

## View file

`app/views/pages/about.html.erb`:

```erb
<h1>About</h1>
<p>This is my Rails app.</p>
```

Action name যদি `about` হয়, Rails default হিসেবে `about.html.erb` render করে।

## Instance variable

Controller থেকে view-তে data পাঠাতে instance variable ব্যবহার করা হয়।

```ruby
class PagesController < ApplicationController
  def home
    @message = "Rails শেখা শুরু"
  end
end
```

View:

```erb
<h1><%= @message %></h1>
```

## Dynamic route parameter

```ruby
get "/posts/:id", to: "posts#show"
```

Controller:

```ruby
class PostsController < ApplicationController
  def show
    @post_id = params[:id]
  end
end
```

## Resource route

CRUD app-এর জন্য Rails shortcut দেয়:

```ruby
resources :posts
```

এতে common routes তৈরি হয়:

- index
- show
- new
- create
- edit
- update
- destroy

চেক করতে:

```sh
bin/rails routes
```

## মনে রাখার নিয়ম

Route হলো দরজা। Controller হলো decision maker। View হলো response-এর HTML।
