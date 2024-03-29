---
title: "Deep Learning by François Chollet"
date: 2022-06-01
categories:
  - book notes
tags:
---

### Chapter 1 What is deep learning?

- "AI can be described as the effort to automate intellectual tasks normally performed by humans."   
<figure>
<img src="../assets/images/chap01-ai.png" style="width:50%">
<figcaption>Fig 1.1 AI, ML and DL</figcaption>
</figure>

- ML learns about rules.
<figure>
<img src="../assets/images/chap01-ml-paradigm.png" style="width:50%">
<figcaption>Fig 1.2 ML paradigm. </figcaption>
</figure>

- "The central problem in machine learning and deep learning is to *meaningfully transform* data: in other words, to learn useful *representations* of the input data at hand--representations that get us closer to the expected output."  
  - e.g., a CNN transforms pixels into embeddings suitable for classification. 
  - e.g., convert some coordinates from Cartesian to Angular
  
- "These are the two essential characteristics of how deep learning learns from data: *the incremental, layer-by-layer way in which increasingly complex representations are developed*, and the fact that *these intermediate incremental representations are learned jointly*, each layer being updated to follow both the representational needs of the layer above and the needs of the layer below." (**1.2.6 What makes deep learning different**)
  - these enable deep learning to *easily* learn complex features *without feature engineering*, as opposed to shallow learning such as SVM.

### Chapter 2 The mathematical building blocks of neural networks
- "It follows that you can interpret a neural network as a very complex geometric transformation in a high-dimensional space, implemented via a series of simple steps...Uncrumpling paper balls is what machine learning is about: finding neat representations for complex, highly folded data *manifolds* in high-dimensional spaces"
<figure>
<img src="../assets/images/chap02-uncrumple-paper.png" style="width:50%">
<figcaption>Fig 2.14 Crumpled ball of two sheets of paper, blue and red. Each layer of NN represents a simple transformation that unscrumples the ball a little bit. </figcaption>
</figure>

### Chapter 3 Introduction to Keras and Tensorflow
- "By choosing a network topology (*architecture of model*), you constrain your space of possibilities (*hypothesis space*) to a specific series of tensor operations, mapping input data to output data."

### Chapter 5 Fundamentals of machine learning
- 5.1.1 Underfitting and overfitting 
  - Be aware of "rare features and spurious correlations" and "statistical fluke"
  - Experiment: adding noisy channels leads to downgraded performance, i.e., overfitting, while adding zero channels does not.
- *5.1.2 The nature of generalization in deep learning*
  - Optimization (model fitting) vs **generalize**.
  - "More generally, the manifold hypothesis posits that all natural data lies on a low-dimensional *manifold* within the high-dimensional space where it is encoded...The ability to *interpolate* between samples is the key to understanding generalization in deep learning." Therefore it's important to provide training samples that are representative of all data.
- 5.3 Improving model fit
  - If train loss does not go down. Adjust key gradient descent parameters, such as learning rate and batch size.
  - If train loss goes down, but not valid loss. Something is fundamentally wrong. Check both data and model.
  - *Always overfit* before tuning for generalization.
- *5.4 Improving generalization*
  - Dataset curation, feature engineering, early stopping, regularization
  - "The core idea is that introducing noise in the output values of a layer can break up happenstance patterns that aren’t significant (what Hinton refers to as *conspiracies*), which the model will start memorizing if no noise is present."

### Chapter 8 Fundamentals of machine learning
- 8.1.1 Convnet
    1. why is it efficient: visual patterns are *translation-invariant* and *spatially hierarchical*.
    1. recommended: dense maps of features (unstrided conv) + max pooling
- 8.3 Fine-tuning a pretrained model (last two optional if only feature extraction)
    1. Add custom network on top of pretrained/base model
    1. Freeze the base network
    1. **Train added custom part**. Otherwise the error of this part would destroy the part of base model going to be unfreezed/fine-tuned.
    1. Unfreeze some layer of the base model. Some layers are not supposed to be unfreezed, e.g., *batch normalization*.
    1. **Jointly train both unfreezed and added with small learning rate (limit change to unfreezed base layers).**

