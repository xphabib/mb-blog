---
title: Layouts, Assets, Forms
date: 2026-05-08
excerpt: Reusable layout, stylesheet, partial, এবং Rails form helper।
---

Rails app-এ সব page একা একা তৈরি করা হয় না। common header, footer, navigation layout-এ রাখা হয়।

## Application layout

`app/views/layouts/application.html.erb` সাধারণত main layout।

```erb
<!DOCTYPE html>
<html>
  <head>
    <title>Blog</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
  </head>
  <body>
    <nav>
      <%= link_to "Home", root_path %>
      <%= link_to "Posts", posts_path %>
    </nav>

    <%= yield %>
  </body>
</html>
```

`yield` জায়গায় current page-এর view render হয়।

## Partial

বারবার ব্যবহার হওয়া view fragment partial-এ রাখা হয়।

`app/views/posts/_post.html.erb`:

```erb
<article>
  <h2><%= post.title %></h2>
  <p><%= post.body %></p>
</article>
```

Use:

```erb
<%= render @posts %>
```

## Link helper

```erb
<%= link_to "New Post", new_post_path %>
<%= link_to "Show", post_path(post) %>
```

Hard-coded URL কম ব্যবহার করুন। Rails path helper বেশি reliable।

## Form helper

```erb
<%= form_with model: @post do |form| %>
  <div>
    <%= form.label :title %>
    <%= form.text_field :title %>
  </div>

  <div>
    <%= form.label :body %>
    <%= form.text_area :body %>
  </div>

  <%= form.submit %>
<% end %>
```

`form_with model: @post` new এবং edit দুই জায়গাতেই কাজ করতে পারে।

## Asset

Rails version অনুযায়ী asset handling আলাদা হতে পারে। সাধারণত stylesheet থাকে:

```text
app/assets/stylesheets/
```

CSS লিখে app-এর look ঠিক করা যায়।

## Turbo সম্পর্কে basic ধারণা

নতুন Rails app-এ Hotwire এবং Turbo থাকতে পারে। Turbo page navigation দ্রুত করে এবং partial update সহজ করে। শুরুতে normal Rails request-response বুঝুন, তারপর Turbo শিখুন।

## Practical advice

- layout-এ common HTML রাখুন
- partial দিয়ে repeated markup কমান
- path helper ব্যবহার করুন
- form helper ব্যবহার করুন
- validation error form-এর কাছেই দেখান
