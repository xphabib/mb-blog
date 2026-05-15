---
title: Ruby on Rails পরিচিতি
date: 2026-05-15
excerpt: Rails কী, কেন শেখা দরকার, এবং শেখার রোডম্যাপ।
---

Ruby on Rails একটি ওয়েব অ্যাপ্লিকেশন ফ্রেমওয়ার্ক। এটি Ruby ভাষার উপর তৈরি। Rails দিয়ে দ্রুত ওয়েব অ্যাপ বানানো যায়, কারণ অনেক সাধারণ কাজের জন্য প্রস্তুত নিয়ম, ফোল্ডার স্ট্রাকচার, কমান্ড, এবং helper দেওয়া থাকে।

## Rails কী ধরনের কাজের জন্য ভালো

- ব্লগ, নিউজ সাইট, ড্যাশবোর্ড
- ই-কমার্স, বুকিং, CRM
- API backend
- admin panel
- দ্রুত MVP বানানো

Rails-এর মূল শক্তি হলো convention over configuration। অর্থাৎ আপনি যদি Rails-এর নিয়ম মেনে কাজ করেন, তাহলে কম কনফিগারেশন লিখেই অনেক কাজ করা যায়।

## শেখার আগে যা জানা ভালো

- HTML, CSS-এর basic ধারণা
- JavaScript-এর basic ধারণা
- terminal বা command line ব্যবহার
- programming-এর variable, condition, loop, function সম্পর্কে ধারণা

Ruby না জানলেও Rails শেখা শুরু করা যায়, তবে Rails ভালোভাবে বুঝতে Ruby-এর basic জানা জরুরি।

## Rails-এর বড় ধারণাগুলো

Rails সাধারণত MVC pattern ব্যবহার করে।

- Model: data এবং business logic
- View: user যা দেখে
- Controller: request নেয়, model থেকে data নেয়, view দেখায়

একটি সহজ request flow:

```text
Browser -> Routes -> Controller -> Model -> Controller -> View -> Browser
```

## এই সিরিজে কী শেখা হবে

এই documentation ধাপে ধাপে সাজানো:

- development environment setup
- Ruby basic
- Rails project structure
- routes, controllers, views
- model, database, Active Record
- CRUD
- validation, flash message
- forms, layout, assets
- authentication এবং authorization
- testing, debugging, deployment

লক্ষ্য হলো Rails মুখস্থ করা নয়। লক্ষ্য হলো Rails অ্যাপ কীভাবে ভাবতে হয়, কীভাবে বানাতে হয়, এবং কীভাবে সমস্যা debug করতে হয় তা শেখা।
