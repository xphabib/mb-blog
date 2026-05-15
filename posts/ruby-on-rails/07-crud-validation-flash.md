---
title: CRUD, Validation, Flash Message
date: 2026-05-09
excerpt: Create, Read, Update, Delete workflow বানানোর মূল প্যাটার্ন।
---

CRUD মানে Create, Read, Update, Delete। অধিকাংশ Rails app-এর core feature CRUD দিয়ে তৈরি।

## Resource route

```ruby
resources :posts
```

এই এক line Rails-কে post CRUD routes বানাতে বলে।

## Controller actions

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.order(created_at: :desc)
  end

  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to @post, notice: "Post created successfully."
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
```

## Strong Parameters

`post_params` security-এর জন্য দরকার। user কোন field submit করতে পারবে তা এখানে allow করা হয়।

```ruby
params.require(:post).permit(:title, :body)
```

## Validation error দেখানো

Model:

```ruby
class Post < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true
end
```

View:

```erb
<% if @post.errors.any? %>
  <ul>
    <% @post.errors.full_messages.each do |message| %>
      <li><%= message %></li>
    <% end %>
  </ul>
<% end %>
```

## Flash message

Redirect-এর পর user-কে ছোট message দেখাতে flash ব্যবহার হয়।

```ruby
redirect_to @post, notice: "Post created successfully."
```

Layout file-এ:

```erb
<% flash.each do |type, message| %>
  <p><%= message %></p>
<% end %>
```

## Edit এবং update

```ruby
def edit
  @post = Post.find(params[:id])
end

def update
  @post = Post.find(params[:id])

  if @post.update(post_params)
    redirect_to @post, notice: "Post updated successfully."
  else
    render :edit, status: :unprocessable_entity
  end
end
```

## Destroy

```ruby
def destroy
  @post = Post.find(params[:id])
  @post.destroy
  redirect_to posts_path, notice: "Post deleted successfully."
end
```

CRUD ভালোভাবে শিখলে Rails দিয়ে বাস্তব app বানানো শুরু করা যায়।
