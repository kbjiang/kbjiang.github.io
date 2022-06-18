---
title: "Deep Learning by François Chollet"
date: 2022-06-01
categories:
  - book notes
tags:
---

### Chapter 1

- "AI can be described as the effort to automate intellectual tasks normally performed by humans."   
<figure>
<img src="../assets/images/chap01-ai.png" alt="Trulli" style="width:50%">
<figcaption>Fig 1.1 AI, ML and DL</figcaption>
</figure>

- ML learns about rules.
<figure>
<img src="../assets/images/chap01-ml-paradigm.png" alt="Trulli" style="width:50%">
<figcaption>Fig 1.2 ML paradigm</figcaption>
</figure>

- "The central problem in machine learning and deep learning is to *meaningfully transform* data: in other words, to learn useful *representations* of the input data at hand--representations that get us closer to the expected output."  
  - e.g., a CNN transforms pixels into embeddings suitable for classification. 
  - e.g., convert some coordinates from Cartesian to Angular
  
- "These are the two essential characteristics of how deep learning learns from data: *the incremental, layer-by-layer way in which increasingly complex representations are developed*, and the fact that *these intermediate incremental representations are learned jointly*, each layer being updated to follow both the representational needs of the layer above and the needs of the layer below." (**1.2.6 What makes deep learning different**)
  - these enable deep learning to *easily* learn complex features *without feature engineering*, as opposed to shallow learning such as SVM.