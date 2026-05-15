---
title: Hotwire দিয়ে Interactive Rails UI
date: 2026-05-24
excerpt: Turbo এবং Stimulus দিয়ে SPA না বানিয়েও fast interactive UI তৈরি করা।
---

Hotwire হলো Rails-এর modern frontend approach। এর লক্ষ্য হলো বেশি JavaScript না লিখে server-rendered HTML দিয়েই interactive UI বানানো।

## Hotwire-এর অংশ

- Turbo Drive
- Turbo Frames
- Turbo Streams
- Stimulus

Turbo page navigation দ্রুত করে। Turbo Frames page-এর নির্দিষ্ট অংশ update করতে পারে। Turbo Streams server থেকে HTML পাঠিয়ে list, counter, message ইত্যাদি update করতে পারে। Stimulus ছোট JavaScript behavior যোগ করে।

## কেন Hotwire দরকার

অনেক app-এ full React বা Vue দরকার হয় না। Dashboard, admin panel, CRUD app, internal tool, SaaS app-এর বেশিরভাগ screen server-rendered HTML দিয়ে ভালোভাবে করা যায়।

Hotwire ব্যবহার করলে:

- frontend code কমে
- API duplication কমে
- Rails view reusable হয়
- development দ্রুত হয়

## Turbo Frame example

```erb
<%= turbo_frame_tag "post_form" do %>
  <%= render "form", post: @post %>
<% end %>
```

এতে শুধু `post_form` অংশ update করা যায়।

## Stimulus কোথায় ব্যবহার করবেন

Stimulus ব্যবহার করুন ছোট behavior-এর জন্য:

- dropdown
- modal
- tabs
- auto-submit search
- copy button
- form preview

## শেখার practice

একটি task app বানান:

- task create করলে list refresh হবে
- delete করলে row disappear করবে
- search input auto-submit করবে
- complete button status update করবে

এই practice করলে Hotwire-এর মূল ধারণা পরিষ্কার হবে।
