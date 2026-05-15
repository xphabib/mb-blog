---
title: Rails API-only App
date: 2026-05-19
excerpt: Rails দিয়ে JSON API বানানোর basic flow।
---

Rails শুধু HTML app নয়। Rails দিয়ে API backend-ও বানানো যায়। API app browser-এ HTML না পাঠিয়ে JSON response পাঠায়।

## API-only project

```sh
rails new my_api --api
```

API mode-এ Rails অনেক view-related middleware বাদ দেয়।

## Controller response

```ruby
class PostsController < ApplicationController
  def index
    posts = Post.order(created_at: :desc)
    render json: posts
  end
end
```

## Routes

```ruby
resources :posts
```

## JSON structure

শুরুতে direct model render করা যায়, কিন্তু বড় app-এ serializer ব্যবহার করা ভালো।

```ruby
render json: {
  id: post.id,
  title: post.title,
  body: post.body
}
```

## API কোথায় দরকার

- mobile app backend
- React/Vue frontend backend
- third-party integration
- public developer API
- internal service

## API security

- authentication token
- rate limit
- CORS config
- strong parameters
- error response format

## Practice project

একটি Todo API বানান:

- tasks list
- task create
- task update
- task delete
- JSON error response
- token authentication
