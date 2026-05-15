---
title: Rails Authentication Generator এবং Login System
date: 2026-05-21
excerpt: Rails app-এ login, session, password, এবং current user ধারণা।
---

Authentication মানে user কে তা যাচাই করা। Modern Rails-এ built-in authentication generator থাকায় basic login system শুরু করা সহজ হয়েছে।

## Authentication-এর অংশ

- users table
- password digest
- sessions
- login form
- logout action
- current user helper
- protected routes

## Password save করা

Password কখনো plain text হিসেবে save করা যাবে না। Rails-এ `has_secure_password` password hash করে save করতে সাহায্য করে।

```ruby
class User < ApplicationRecord
  has_secure_password
end
```

## Session

Login successful হলে user id session-এ রাখা হয়।

```ruby
session[:user_id] = user.id
```

Current user:

```ruby
def current_user
  @current_user ||= User.find_by(id: session[:user_id])
end
```

## Protected page

```ruby
before_action :require_login

def require_login
  redirect_to login_path unless current_user
end
```

## Devise না built-in?

শেখার জন্য simple authentication নিজে লিখুন। Production app-এ যদি complex feature দরকার হয়, Devise এখনও শক্তিশালী option।

## Security checklist

- password hash করুন
- login failure message generic রাখুন
- logout করলে session clear করুন
- admin action protect করুন
- strong parameters ব্যবহার করুন
