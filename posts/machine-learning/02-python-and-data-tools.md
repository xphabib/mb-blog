---
title: ML শেখার জন্য Python এবং Data Tools
date: 2026-05-16
excerpt: Machine Learning কাজের জন্য কোন Python tools আগে শিখবেন এবং কীভাবে data handle করবেন।
---

Machine Learning শেখার সবচেয়ে practical শুরু হলো Python দিয়ে। কারণ বেশিরভাগ beginner project Python ecosystem-এ করা হয়।

## কী কী শিখবেন

- Python syntax
- `numpy`
- `pandas`
- `matplotlib`
- `seaborn`
- `scikit-learn`

## Python কেন দরকার

Python দিয়ে আপনি data read, clean, transform, train, এবং evaluate সব করতে পারবেন। ML-এর অনেক কাজ notebook-এ করা হয়, তাই readable code খুব important।

## `pandas` কী কাজে লাগে

`pandas` data table handle করার জন্য ব্যবহার হয়।

Example কাজ:

- CSV file read করা
- column select করা
- missing value check করা
- group summary বের করা
- filter এবং sort করা

```python
import pandas as pd

df = pd.read_csv("data.csv")
print(df.head())
print(df.isna().sum())
```

## `numpy` কী কাজে লাগে

`numpy` দিয়ে সংখ্যাভিত্তিক computation দ্রুত করা যায়।

- array বানানো
- vector operation
- matrix calculation
- model input shape বুঝা

## প্রথম project

একটা small dataset নিয়ে:

- file load করুন
- 2-3 column explore করুন
- missing value দেখুন
- simple plot বানান

এভাবে data থেকে confidence তৈরি হয়।
