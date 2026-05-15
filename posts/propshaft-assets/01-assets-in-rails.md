---
title: Propshaft দিয়ে Rails Assets Manage
date: 2026-05-20
excerpt: CSS, image, JavaScript asset Rails app-এ কীভাবে serve হয়।
---

Propshaft Rails-এর modern asset pipeline। এটি Sprockets-এর তুলনায় সহজ এবং modern browser tooling-এর সাথে ভালোভাবে মানায়।

## Asset কী

Asset বলতে বোঝায়:

- CSS
- JavaScript
- image
- font
- icon

Rails app-এ এগুলো browser-এ পাঠাতে asset pipeline ব্যবহার হয়।

## Propshaft কী করে

Propshaft asset fingerprinting এবং serving সহজ করে।

Example fingerprinted file:

```text
application-2d4f7c9.css
```

Fingerprint থাকলে browser cache safe হয়। file change হলে filename বদলায়, তাই browser নতুন file নেয়।

## কোথায় asset রাখবেন

Rails app অনুযায়ী location আলাদা হতে পারে, তবে সাধারণত:

```text
app/assets/
```

CSS:

```text
app/assets/stylesheets/application.css
```

Images:

```text
app/assets/images/
```

## Practical advice

- ছোট app-এ simple CSS রাখুন
- unnecessary frontend build tool আনবেন না
- image optimize করুন
- CSS component অনুযায়ী organize করুন

## শেখার practice

একটি blog layout বানান:

- header
- article card
- sidebar
- form style
- responsive mobile layout

তারপর CSS file split করে maintainable structure তৈরি করুন।
