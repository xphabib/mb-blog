---
title: Rails App-এ AI Feature যোগ করা
date: 2026-05-16
excerpt: Rails app-এ AI ব্যবহার করার practical idea এবং architecture।
---

AI এখন অনেক web app-এর feature layer হিসেবে ব্যবহার হচ্ছে। Rails app-এ AI যোগ করা যায় content generation, summarization, search, recommendation, chatbot, automation ইত্যাদিতে।

## AI feature idea

- blog summary
- title suggestion
- comment moderation
- semantic search
- support chatbot
- email draft
- report explanation
- data extraction

## Basic architecture

একটি AI feature সাধারণত এমন:

```text
User input -> Controller -> Service object -> AI API -> Save result -> Show response
```

AI call slow হতে পারে, তাই background job ব্যবহার করা ভালো।

## Service object

```ruby
class PostSummaryGenerator
  def initialize(post)
    @post = post
  end

  def call
    # AI API call here
  end
end
```

Controller সরাসরি AI logic না রাখাই ভালো।

## Data safety

AI feature বানানোর সময় ভাবুন:

- sensitive data পাঠানো হচ্ছে কি না
- user consent আছে কি না
- output verify করা দরকার কি না
- cost control আছে কি না
- rate limit দরকার কি না

## AI response save করবেন?

সব response save করার দরকার নেই। তবে expensive generation হলে save করলে cost কমে।

Example:

- generated summary save করুন
- temporary chat response save না-ও করতে পারেন
- audit দরকার হলে log রাখুন

## Practice project

Rails blog-এ AI summary যোগ করুন:

- post body থেকে summary generate
- background job-এ generate
- summary column-এ save
- regenerate button
- admin-only control
