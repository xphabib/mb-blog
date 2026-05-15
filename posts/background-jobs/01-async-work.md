---
title: Rails Background Jobs
date: 2026-05-17
excerpt: Slow কাজ request-এর বাইরে চালানোর জন্য background job।
---

Web request দ্রুত হওয়া দরকার। Email পাঠানো, report generate করা, file process করা, external API call করা slow হতে পারে। এগুলো background job-এ পাঠানো ভালো।

## Background job কী

Background job হলো এমন কাজ যা user request শেষ হওয়ার পর আলাদা process-এ চলে।

Example:

```ruby
class WelcomeEmailJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    user = User.find(user_id)
    UserMailer.welcome(user).deliver_now
  end
end
```

Call:

```ruby
WelcomeEmailJob.perform_later(user.id)
```

## কখন job ব্যবহার করবেন

- email
- report
- image processing
- payment webhook processing
- notification
- data import
- cleanup task

## Queue adapter

Rails Active Job interface দেয়। Adapter হিসেবে Solid Queue, Sidekiq ইত্যাদি ব্যবহার করা যায়।

## Job design

ভালো job:

- ছোট কাজ করে
- idempotent হয়
- record id নেয়, full object নয়
- retry failure handle করে
- log রাখে

## Common mistake

Job-এ direct user input blindly ব্যবহার করবেন না। Job পরে চলতে পারে, তখন record delete বা update হয়ে যেতে পারে। তাই `find_by` এবং nil handling দরকার হতে পারে।

## Practice project

একটি newsletter system বানান:

- user subscribe করবে
- email background job-এ যাবে
- failed job retry হবে
- admin job status দেখবে
