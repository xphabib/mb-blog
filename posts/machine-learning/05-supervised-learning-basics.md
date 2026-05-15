---
title: Supervised Learning Basics
date: 2026-05-19
excerpt: Labeled data দিয়ে model শেখানো এবং regression, classification বোঝা।
---

Supervised learning হলো ML-এর সবচেয়ে common area। এখানে data-এর সাথে label থাকে।

## দুই ধরনের problem

### Regression

Continuous value predict করা।

Example:

- house price
- sales forecast
- temperature prediction

### Classification

Category predict করা।

Example:

- spam or not spam
- fraud or not fraud
- positive or negative

## Common algorithm

- linear regression
- logistic regression
- decision tree
- random forest
- gradient boosting

## Training flow

```text
Input features -> Model -> Prediction -> Loss -> Update
```

Model prediction আর actual answer-এর difference কমানোই training-এর লক্ষ্য।

## Baseline model

প্রথমে simple baseline বানান। তার ওপর compare করে বুঝুন improvement হলো কি না।

## Practical idea

একটা house price dataset নিন:

- area
- rooms
- location

এগুলো ব্যবহার করে price predict করুন।

এতে আপনি regression workflow হাতে-কলমে বুঝবেন।
