---
title: PostgreSQL with Rails
date: 2026-05-18
excerpt: Rails project-এ PostgreSQL কেন এবং কীভাবে ব্যবহার করবেন।
---

PostgreSQL production Rails app-এর জন্য খুব popular database। এটি reliable, powerful, এবং Rails-এর Active Record-এর সাথে ভালো কাজ করে।

## PostgreSQL কেন

- relational data ভালোভাবে handle করে
- indexing শক্তিশালী
- JSONB support আছে
- full-text search করা যায়
- transaction reliable
- production-ready

## Project তৈরি

```sh
rails new blog --database=postgresql
cd blog
bin/rails db:create
```

## database.yml

Database configuration থাকে:

```text
config/database.yml
```

Development, test, production environment আলাদা database ব্যবহার করে।

## Migration

```sh
bin/rails generate model Post title:string body:text
bin/rails db:migrate
```

## Index

Search বা lookup দ্রুত করতে index দরকার।

```ruby
add_index :users, :email, unique: true
```

## JSONB

Flexible data রাখার জন্য JSONB ব্যবহার করা যায়।

```ruby
add_column :events, :metadata, :jsonb, default: {}
```

## Practical advice

- production app-এ SQLite থেকে PostgreSQL-এ যান
- important columns index করুন
- migration ছোট রাখুন
- backup strategy রাখুন
- slow query log দেখুন

## Practice project

একটি product catalog বানান:

- products table
- categories table
- search
- price filter
- indexed slug
- JSONB metadata
