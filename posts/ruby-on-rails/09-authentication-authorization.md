---
title: Authentication এবং Authorization
date: 2026-05-07
excerpt: Login system, current user, permission, এবং secure workflow।
---

Authentication মানে user কে তা যাচাই করা। Authorization মানে user কী করতে পারবে তা ঠিক করা।

## Authentication example

Login system-এ সাধারণত লাগে:

- users table
- password digest
- session
- login form
- logout action
- current_user helper

Rails-এ password securely handle করতে `has_secure_password` ব্যবহার করা যায়।

Migration:

```ruby
create_table :users do |t|
  t.string :email, null: false
  t.string :password_digest, null: false
  t.timestamps
end
```

Model:

```ruby
class User < ApplicationRecord
  has_secure_password
end
```

## Session

Login হলে user id session-এ রাখা যায়:

```ruby
session[:user_id] = user.id
```

Current user:

```ruby
def current_user
  @current_user ||= User.find_by(id: session[:user_id])
end
```

## Login required

```ruby
def require_login
  redirect_to login_path, alert: "Please log in first." unless current_user
end
```

Controller-এ:

```ruby
before_action :require_login
```

## Authorization

সব logged in user সব কাজ করতে পারবে না। যেমন শুধু post owner post edit করতে পারবে।

```ruby
def authorize_post_owner
  redirect_to posts_path, alert: "Not allowed." unless @post.user == current_user
end
```

## Gem ব্যবহার

Real project-এ authentication-এর জন্য Devise জনপ্রিয়। Authorization-এর জন্য Pundit বা CanCanCan ব্যবহার করা যায়।

শেখার সময় নিজের হাতে simple login বানালে concept পরিষ্কার হয়। production app-এ mature gem ব্যবহার করা ভালো।

## Security checklist

- password plain text save করবেন না
- strong parameters ঠিক রাখুন
- sensitive action-এ authorization check দিন
- session reset নিয়ে জানুন
- admin route আলাদা করে protect করুন
- error message-এ sensitive data দেখাবেন না
