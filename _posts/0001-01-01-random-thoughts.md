---
title: "Random thoughts"
date: 
categories:
  - random thoughts
tags:
---

### Why is linearity about `W`?

1. Think of a linear regressor (or a perception). The point (x, y) is given and fixed. The only thing controls the size of the loss is the slope of the linear boundary, which is `W`. Therefore it is the shape of `W` that matters.

1. The model is linear **as long as the decision boundary is linear**, with or without feature engineering. 
    1. For example, Logistic Regression is linear when we take log on P.
    1. Note the difference between `y = W*exp(x)` and `y = exp(W*x)`, latter is nonlinear.

1. Examples of nonlinear models. 
    1. Relu is nonlinear, i.e., no linear combination of `W` can return `y=max(0, x)`. *This is also why we need nonlinearity in NNs.*
    1. Random Froest, the boundaries are step functions.

### Transformers
1. The Query, Key and Value matrices are just like the filters in CNN. Multi-head is just multi-channel.

