---
title: Model Evaluation এবং Overfitting
date: 2026-05-21
excerpt: ML model ঠিকমতো কাজ করছে কি না তা যাচাই করার নিয়ম।
---

Model train করা যথেষ্ট না। Model evaluate করতে জানতে হয়।

## কেন evaluation দরকার

একটা model training data-তে ভালো হলেও নতুন data-তে খারাপ করতে পারে। তাই test performance দেখতে হয়।

## Common split

- training set
- validation set
- test set

## Regression metric

- MAE
- MSE
- RMSE

## Classification metric

- accuracy
- precision
- recall
- F1 score

## Overfitting

Model যখন training data memorise করে ফেলে, কিন্তু generalize করতে পারে না।

Sign:

- training score high
- validation score low

Fix:

- simpler model
- more data
- regularization
- better features

## Cross-validation

Small dataset হলে cross-validation কাজে লাগে। এতে একবারের split-এর উপর depend করা কমে।

## Rule

Metric না বুঝে model ভালো বলা ঠিক না।

Problem অনুযায়ী metric choose করতে হবে।
