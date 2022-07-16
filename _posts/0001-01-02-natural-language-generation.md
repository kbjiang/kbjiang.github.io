---
title: "Misc about natural language generation"
date: 2022-07-04
header-includes:
  - \usepackage{amssymb}
  - \usepackage{eqnarray}
categories:
  - DL metrics
  - NLG
tags:
---
1. Shannon's Entropy
    $$ \begin{align*}
      H(x) &= \mathbb{E}_{x\sim{P}}[I(x)]  \\
          &= \mathbb{E}_{x\sim{P}}[-\log P(x)] \\
          &= \mathbb{E}_{x\sim{P}} \log ({1}/{P(x)}) \\
          &= \sum_{x} P(x)\log({1}/{P(x)}) \\
    \end{align*} $$
    Apparently, events with lower probability ("surprises") contain larger amount of "information"; entropy is just a weighted sum over the whole distribution. *Entropy is the average number of bits to encode the information contained in a random variable.*
    > How to understand cross entropy from here?
    > Which distributions lead to low entropy? Peaky or flta? 

1. Perplexity
    $$ \begin{align*}
      \textrm{Perplexity} &= 2^{H(x)} \\
          &= 2^{\textrm{average num of bits}} \\
          &= 2^{-\sum_{i=1}^{N} P(x_i) \log_2 q(x_i)} \\
          &= 2^{-\sum_{i=1}^{N} 1/N \log_2 q(x_i)}  \\
          &= \prod_{i}^{N} q(x_i)^{-\frac{1}{N}} \\
    \end{align*} $$
    - $N$ is the size of the vocab; $p(x)$ is the true distribution and assumed to be uniform in the derivation; $$q(x)$ is the distribution predicted by the model.
    - Given the physical meaning of entropy, *perplexity is the average total amount of all possible information contained in a random variable.*
    - The (cross-)perplexity is a measure of how well the model predicts the distribution of the data. If the model is certain about the next word, i.e., the distribution is peaky, entropy/perplexity is low. If the model is uncertain about the next word, i.e., the distribution is flat, entropy/perplexity is high.
    
1. References
    1. https://towardsdatascience.com/the-intuition-behind-shannons-entropy-e74820fe9800
    1. https://towardsdatascience.com/perplexity-intuition-and-derivation-105dd481c8f3

<p align="center">
  <img src="../assets/images/loss-curves.png" style="width:60%"/>
</p>

