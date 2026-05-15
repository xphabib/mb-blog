---
title: Rails 8 এবং Modern Rails Stack
date: 2026-05-25
excerpt: Rails 8 কেন গুরুত্বপূর্ণ এবং modern Rails stack কোন কোন অংশ দিয়ে তৈরি।
---

Rails 8 modern Rails development-কে আরও সরল করেছে। আগে production app চালাতে Redis, আলাদা queue system, deployment script, asset pipeline নিয়ে অনেক সিদ্ধান্ত নিতে হতো। Rails 8 সেই জায়গায় default stack আরও পরিষ্কার করেছে।

## Modern Rails Stack কী

Modern Rails stack বলতে সাধারণত এগুলো বোঝায়:

- Rails 8
- Hotwire
- Propshaft
- Solid Queue
- Solid Cache
- Solid Cable
- Kamal
- built-in authentication generator
- PostgreSQL বা SQLite

এগুলো মিলিয়ে Rails আবার একটি full-stack framework হিসেবে শক্তিশালী অবস্থানে আছে।

## কেন এটা trend

অনেক team আলাদা frontend framework, আলাদা deployment tool, আলাদা queue infra maintain করতে করতে জটিলতায় পড়ে। Modern Rails stack সেই complexity কমায়।

একটি ছোট team এখন Rails দিয়ে:

- backend লিখতে পারে
- HTML render করতে পারে
- interactive UI বানাতে পারে
- background job চালাতে পারে
- cache রাখতে পারে
- app deploy করতে পারে

## শেখার অর্ডার

প্রথমে Rails-এর basic MVC বুঝুন। তারপর শিখুন:

- routes, controllers, views
- models এবং database
- forms এবং validation
- Hotwire
- background jobs
- deployment

Modern feature আগে শিখলে confusing লাগতে পারে। Rails-এর normal request-response flow পরিষ্কার হলে বাকি অংশ সহজ হয়।

## Practical project idea

একটি notes app বানান:

- user note লিখবে
- note list দেখাবে
- note search হবে
- edit/delete থাকবে
- background job দিয়ে email notification যাবে
- Kamal দিয়ে deploy হবে

এই একটি project-এ modern Rails stack-এর বড় অংশ practice করা যায়।
