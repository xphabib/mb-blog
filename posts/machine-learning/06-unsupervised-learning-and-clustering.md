---
title: Unsupervised Learning এবং Clustering
date: 2026-05-20
excerpt: Label ছাড়া data থেকে group, pattern, এবং hidden structure খোঁজা।
---

Unsupervised learning-এ labeled answer থাকে না। Model data-এর ভিতরে hidden structure খোঁজে।

## কোথায় কাজে লাগে

- customer segmentation
- document grouping
- anomaly detection
- market basket pattern

## Clustering

Clustering মানে similar sample এক group-এ আনা।

Common algorithm:

- k-means
- hierarchical clustering
- DBSCAN

## PCA

PCA data dimension কমাতে use হয়। অনেক feature থাকলে visualization বা compression-এ এটা useful।

## Practical intuition

ধরুন আপনার কাছে customer data আছে:

- age
- income
- spending

Clustering দিয়ে আপনি আলাদা buyer group পেতে পারেন।

## Warning

Unsupervised learning-এ accuracy metric সবসময় থাকে না। Result interpret করতে domain understanding লাগে।

এখানে model output-এর অর্থ বুঝা সবচেয়ে গুরুত্বপূর্ণ।
