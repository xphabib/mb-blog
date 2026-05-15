---
title: Models, Database, Active Record
date: 2026-05-10
excerpt: Database table, migration, model, এবং query শেখা।
---

Rails-এ database-এর সাথে কাজ করার প্রধান tool হলো Active Record। এটি model class দিয়ে database table control করতে সাহায্য করে।

## Model তৈরি

```sh
bin/rails generate model Post title:string body:text published:boolean
```

এতে সাধারণত দুটি জিনিস তৈরি হয়:

- `app/models/post.rb`
- `db/migrate/...create_posts.rb`

## Migration চালানো

```sh
bin/rails db:migrate
```

Migration database table তৈরি বা পরিবর্তন করে।

## Model class

```ruby
class Post < ApplicationRecord
end
```

`Post` model সাধারণত `posts` table-এর সাথে যুক্ত হয়। Rails naming convention দিয়ে এটি বুঝে নেয়।

## Rails console

Database experiment করার জন্য console খুব useful।

```sh
bin/rails console
```

Console-এ:

```ruby
Post.create(title: "First Post", body: "Hello Rails", published: true)
Post.all
Post.first
Post.find(1)
```

## Query example

```ruby
Post.where(published: true)
Post.order(created_at: :desc)
Post.limit(5)
```

Chain করা যায়:

```ruby
Post.where(published: true).order(created_at: :desc).limit(5)
```

## Record update

```ruby
post = Post.find(1)
post.update(title: "Updated title")
```

## Record delete

```ruby
post = Post.find(1)
post.destroy
```

## Validation

Model-এ validation দিলে invalid data save হবে না।

```ruby
class Post < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true
end
```

## Association

এক user-এর অনেক post থাকতে পারে:

```ruby
class User < ApplicationRecord
  has_many :posts
end

class Post < ApplicationRecord
  belongs_to :user
end
```

Database বুঝলে Rails-এর অর্ধেক সহজ হয়ে যায়।
