---
title: Testing, Debugging, Deployment
date: 2026-05-06
excerpt: Rails app verify, problem debug, এবং live server-এ publish করার ধারণা।
---

Rails শেখার শেষ ধাপ শুধু feature বানানো নয়। App ঠিকমতো কাজ করছে কি না, error হলে কীভাবে খুঁজবেন, এবং deploy কীভাবে করবেন সেটাও জানা দরকার।

## Test চালানো

Rails default test framework দেয়।

```sh
bin/rails test
```

Model test, controller test, integration test দিয়ে behavior verify করা যায়।

## Simple model test

```ruby
test "post title is required" do
  post = Post.new(body: "Hello")
  assert_not post.valid?
end
```

## Debugging

কিছু useful command:

```sh
bin/rails routes
bin/rails console
bin/rails db:migrate:status
bin/rails logs
```

Controller বা model-এ temporary debug করতে:

```ruby
puts params.inspect
```

আরও ভালোভাবে debug করতে debugger ব্যবহার করুন:

```ruby
debugger
```

## Common error

- route missing: `bin/rails routes` দেখুন
- template missing: view file আছে কি না দেখুন
- undefined method: variable nil কি না দেখুন
- migration pending: `bin/rails db:migrate` চালান
- parameter missing: strong parameters check করুন

## Environment

Rails-এর সাধারণ environment:

- development
- test
- production

Production environment development-এর মতো নয়। এখানে caching, logging, credentials, database config আলাদা হতে পারে।

## Deployment options

Rails app deploy করার কিছু পথ:

- Render
- Fly.io
- Heroku-style platform
- VPS with Kamal
- Docker-based server

নতুনদের জন্য managed platform সহজ। real production control দরকার হলে VPS বা container setup শেখা ভালো।

## Deploy করার আগে checklist

- test pass করছে
- database migration ready
- environment variable set
- secret key configured
- production database configured
- logs দেখা যায়
- error page ঠিক আছে

## শেখা চালিয়ে যাওয়ার পথ

Rails শেখার পরে এগুলো শিখুন:

- background job
- mailer
- file upload
- API mode
- caching
- performance
- Hotwire
- security
- deployment automation

Rails শেখার সবচেয়ে ভালো পদ্ধতি হলো ছোট project বানানো। একটি blog, তারপর authentication, তারপর comment, তারপর admin panel যোগ করুন। প্রতিটি feature Rails-এর নতুন অংশ শেখাবে।
