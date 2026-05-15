---
title: Machine Learning-এর জন্য Math এবং Statistics
date: 2026-05-17
excerpt: ML বুঝতে যে math এবং statistics basics দরকার, তা সহজ ভাষায়।
---

Machine Learning-এর ভিতরের ধারণা বুঝতে math খুব কাজে লাগে। তবে শুরুতে advanced theorem না, basic intuition দরকার।

## কোন topic আগে শিখবেন

- mean, median, mode
- variance, standard deviation
- probability
- correlation
- vector, matrix
- derivative-এর basic meaning

## Statistics কেন দরকার

Data বুঝতে statistics সাহায্য করে। উদাহরণ:

- কোন feature বেশি spread out
- কোন value abnormal
- data balanced না imbalanced
- relationship strong না weak

## Probability-এর intuition

Probability model-এর uncertainty বুঝায়। Classification problem-এ এটা খুব common।

Example:

- spam হওয়ার chance
- customer churn হওয়ার chance
- disease present হওয়ার chance

## Linear algebra-এর ছোট ভূমিকা

Model input সাধারণত vector আকারে থাকে। Feature list কে model matrix হিসেবে দেখে।

### Simple intuition

- row = one sample
- column = one feature
- matrix = পুরো dataset

## Derivative কেন গুরুত্বপূর্ণ

Training-এর সময় model parameter update করতে derivative use হয়। Gradient descent এই idea-এর উপর দাঁড়িয়ে।

শুরুতে শুধু বুঝুন:

- error কতটা change হচ্ছে
- parameter কোন দিকে update হচ্ছে

এই math intuition থাকলে later ML paper এবং algorithm অনেক সহজ লাগে।
