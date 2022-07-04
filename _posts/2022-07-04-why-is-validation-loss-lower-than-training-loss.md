---
title: "Why is my validation loss lower than training loss"
date: 2022-07-04
categories:
  - DL training
tags:
---

I was working on BERT continual pretraining and ran into the case where my validation loss was lower than training loss till the very last epoch or two.

<p align="center">
  <img src="../assets/images/loss-curves.png" style="width:60%"/>
</p>

Went online to look for explanations and found this by Aurelien Geron.
<p align="center">
  <img src="../assets/images/loss-curves-explain-1.png" style="width:60%"/>
  <img src="../assets/images/loss-curves-explain-2.png" style="width:60%"/>
  <img src="../assets/images/loss-curves-explain-3.png" style="width:60%"/>
</p>