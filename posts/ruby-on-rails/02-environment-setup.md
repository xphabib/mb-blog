---
title: Development Environment Setup
date: 2026-05-14
excerpt: Ruby, Rails, database, editor, এবং প্রথম Rails app setup।
---

Rails শেখার জন্য আপনার machine-এ Ruby, Rails, database, এবং একটি editor দরকার।

## দরকারি জিনিস

- Ruby
- Rails gem
- SQLite বা PostgreSQL
- Node.js
- Git
- VS Code বা পছন্দের editor

শুরুর জন্য SQLite ব্যবহার করা সহজ। production app বা real project-এর জন্য PostgreSQL বেশি প্রচলিত।

## Ruby install করা

Linux বা macOS-এ version manager ব্যবহার করা ভালো:

```sh
rbenv install 3.3.6
rbenv global 3.3.6
ruby -v
```

RVM ব্যবহার করলেও হবে:

```sh
rvm install 3.3.6
rvm use 3.3.6 --default
ruby -v
```

## Rails install করা

```sh
gem install rails
rails -v
```

## নতুন Rails project তৈরি

SQLite দিয়ে:

```sh
rails new blog
cd blog
bin/rails server
```

তারপর browser-এ যান:

```text
http://127.0.0.1:3000
```

## PostgreSQL দিয়ে project

```sh
rails new blog --database=postgresql
cd blog
bin/rails db:create
bin/rails server
```

## গুরুত্বপূর্ণ Rails command

```sh
bin/rails server
bin/rails console
bin/rails routes
bin/rails db:migrate
bin/rails generate
bin/rails test
```

## প্রথম সমস্যা হলে কী দেখবেন

- Ruby version ঠিক আছে কি না
- Rails install হয়েছে কি না
- database server চলছে কি না
- project folder-এর ভেতরে command চালাচ্ছেন কি না
- error message-এর প্রথম এবং শেষ অংশ পড়ুন

Rails error message সাধারণত helpful হয়। error পুরোটা না পড়ে শুধু শেষ লাইন দেখলে অনেক সময় আসল কারণ মিস হয়।
