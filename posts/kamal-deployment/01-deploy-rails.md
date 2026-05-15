---
title: Kamal দিয়ে Rails App Deploy
date: 2026-05-23
excerpt: Docker-based deployment সহজ করার জন্য Kamal কীভাবে কাজ করে।
---

Kamal হলো Rails app deploy করার একটি tool। এটি Docker image build করে server-এ deploy করতে সাহায্য করে। Rails 8-এর modern deployment story-তে Kamal গুরুত্বপূর্ণ।

## Kamal কী করে

Kamal সাধারণত এগুলো handle করে:

- Docker image build
- registry push
- server pull
- container start
- zero-downtime style deploy
- environment variable manage
- accessory services চালানো

## কেন Kamal জনপ্রিয়

আগে Rails deploy করতে Capistrano, Heroku, manual VPS setup, custom Docker script ইত্যাদি ব্যবহার করা হতো। Kamal Rails app-এর জন্য একটি predictable deployment workflow দেয়।

## Basic deployment idea

```sh
bin/kamal setup
bin/kamal deploy
```

এর আগে দরকার:

- server
- Docker
- registry access
- domain
- environment variables
- database config

## config/deploy.yml

Kamal-এর main config সাধারণত `config/deploy.yml` ফাইলে থাকে।

এখানে থাকে:

- app name
- image name
- server IP
- registry info
- env variables
- accessories

## Deployment checklist

- production credentials ঠিক আছে
- database migration ready
- `SECRET_KEY_BASE` configured
- domain DNS server-এ point করছে
- Docker registry login করা
- logs দেখার command জানা

## শেখার project

একটি ছোট Rails blog app বানিয়ে VPS-এ deploy করুন। প্রথম deploy-এর সময় শুধু app চালান। দ্বিতীয় ধাপে database, background job, SSL, domain যোগ করুন।
