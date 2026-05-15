---
title: Data Cleaning এবং Feature Engineering
date: 2026-05-18
excerpt: ML project-এর সবচেয়ে গুরুত্বপূর্ণ অংশগুলো, data clean করা এবং useful feature বানানো।
---

Real-world data messy হয়। তাই model train করার আগে data prepare করা লাগে।

## Data cleaning

Common কাজ:

- missing value handle করা
- duplicate remove করা
- wrong data type fix করা
- outlier inspect করা
- irrelevant column drop করা

```python
df = df.drop_duplicates()
df["age"] = df["age"].fillna(df["age"].median())
```

## Categorical data

Text category model direct বুঝতে পারে না। তাই encode করতে হয়।

Example:

- `male`, `female`
- `Dhaka`, `Chattogram`
- `yes`, `no`

## Feature engineering

Raw data থেকে better signal বের করা feature engineering।

Example:

- date থেকে weekday
- price থেকে log price
- text length
- count based feature

## কেন এটা important

অনেক সময় simple model + good feature, complex model-এর চেয়ে better হয়।

## Rule of thumb

- আগে data understand করুন
- তারপর transformation করুন
- every change লিখে রাখুন

Feature engineering-এ discipline না থাকলে result reproduce করা কঠিন হয়।
