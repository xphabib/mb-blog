---
title: Rails শেখার জন্য Ruby Basics
date: 2026-05-13
excerpt: Ruby syntax, method, block, class, hash, এবং Rails-এ এগুলোর ব্যবহার।
---

Rails Ruby দিয়ে লেখা। তাই Rails বুঝতে Ruby-এর কিছু basic জিনিস জানা দরকার।

## Variable

```ruby
name = "Habib"
age = 25
active = true
```

Ruby-তে variable declare করতে আলাদা keyword লাগে না।

## Array

```ruby
tags = ["ruby", "rails", "web"]

tags.each do |tag|
  puts tag
end
```

## Hash

```ruby
user = {
  name: "Habib",
  email: "habib@example.com"
}

puts user[:name]
```

Rails-এ params, config, options অনেক জায়গায় hash ব্যবহার হয়।

## Method

```ruby
def full_name(first_name, last_name)
  "#{first_name} #{last_name}"
end

puts full_name("Ruby", "Rails")
```

Ruby method-এর শেষ expression return হয়। চাইলে explicit `return` ব্যবহার করা যায়, তবে সবসময় দরকার নেই।

## Class

```ruby
class User
  def initialize(name)
    @name = name
  end

  def greet
    "Hello, #{@name}"
  end
end

user = User.new("Rails")
puts user.greet
```

Rails model, controller, mailer সবই Ruby class।

## Block

```ruby
3.times do |number|
  puts number
end
```

Rails-এ block খুব বেশি ব্যবহার হয়:

```ruby
form_with model: @post do |form|
  form.text_field :title
end
```

## Symbol

```ruby
:title
:email
:admin
```

Symbol immutable identifier-এর মতো কাজ করে। Rails-এ column name, route name, parameter key হিসেবে symbol অনেক দেখা যায়।

## Ruby শেখার সময় লক্ষ্য

Rails শুরু করার জন্য Ruby expert হতে হবে না। তবে এগুলো পরিষ্কার রাখুন:

- string, number, boolean
- array, hash
- method
- class
- block
- symbol
- module

এরপর Rails code পড়তে অনেক সহজ হবে।
