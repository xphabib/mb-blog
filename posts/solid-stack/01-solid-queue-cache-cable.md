---
title: Solid Queue, Solid Cache, Solid Cable
date: 2026-05-22
excerpt: Redis ছাড়া Rails app-এ queue, cache, এবং cable চালানোর ধারণা।
---

Solid Stack Rails-এর modern infrastructure simplification-এর বড় অংশ। এতে database-backed queue, cache, এবং cable ব্যবহার করা যায়।

## Solid Queue

Solid Queue background job চালানোর জন্য ব্যবহার হয়। আগে Sidekiq এবং Redis খুব common ছিল। Solid Queue database ব্যবহার করে job store করতে পারে।

Example:

```ruby
class ReportJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    user = User.find(user_id)
    ReportMailer.weekly(user).deliver_now
  end
end
```

Run:

```ruby
ReportJob.perform_later(user.id)
```

## Solid Cache

Solid Cache cache data database-backedভাবে রাখতে পারে। এতে আলাদা Redis dependency কমে।

## Solid Cable

Action Cable real-time feature-এর জন্য ব্যবহার হয়। Solid Cable cable adapter হিসেবে database-backed approach দেয়।

## কখন ব্যবহার করবেন

Solid Stack ভালো যখন:

- app ছোট বা medium
- infra কম রাখতে চান
- Redis maintain করতে চান না
- Rails default stack-এর সাথে থাকতে চান

## কখন ভাবতে হবে

High-throughput queue, heavy real-time traffic, বা very large cache workload হলে dedicated tools দরকার হতে পারে। কিন্তু অনেক Rails app-এর জন্য Solid Stack যথেষ্ট।

## Practice idea

একটি notification system বানান:

- user action করলে background job enqueue হবে
- notification cache হবে
- real-time update Turbo Stream দিয়ে দেখাবে
