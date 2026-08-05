---
title: "Implementation: CNN from scratch"
date: 2026-04-05
tags:
  - "implementation"
  - "CNN"
---
## Motivation
I've always used PyTorch for this. Wanted to implement it from scratch by myself.
## Takeaways
1. `backward` is a propagation
	1. given `d_out`, gradient from $(n+1)$-th layer, return `d_in`, gradient coming out $n$-th layer
2. `im2col` avoids nested `for` loops
	1. `Conv` layer becomes simple MLP
	2. need to take care of overlaps between patches
3. Mental picture of `Conv2D`
	1. Highlighted neurons will receive gradient updates from mulitple output locations, therefore the `col2im` then summation in `backward` function.
		1. ![[cnn-im2col.png]]
	2. *Locality*: the partial connection is the essens of CNN, i.e., only involving $k$ neurons at a time. [Image credit](https://deepimaging.github.io/lectures/lecture_10_intro_to_CNN's-PartI.pdf)
		1. ![[cnn-toeplitz.png|500]]

## Implementation
1. `LinearLayer`
	```Python
	def backward(self, d_out):
		"""Just a propagation: given gradient d_out (N, D_out), return gradient d_in (N, D_in)"""
		self.d_in = d_out @ self.W  # d_in is NOT D_in!
		......
		return self.d_in
	```
2. `im2col`. A flatten trick
	```Python
	def im2col(x, kH, kW, stride):
	    """
	    Each output pixel (i, j) is the inner product of an image patch and the kernel (C_out, C_in*kH*kW); flatten input patches to avoid nested `for` loops
	    kH: kernel size in height
	    kW: kernel size in width
	    stride: stride
	    input: (N, C_in, H_in, W_in)
	    output: (N, H_out*W_out, C_in*kH*kW)
	    """
	    N, C_in, H_in, W_in = x.shape
	    H_out = (H_in - kH)//stride + 1
	    W_out = (W_in - kW)//stride + 1
	    x_col = []  # x_col to collect all flattened patches
	    # iteratre over every pixel
	    for i in range(H_out):
	        for j in range(W_out):
	            x_= x[:, :, i*stride:i*stride+kH, j*stride:j*stride+kW].reshape(N, -1)  # patch dim (N, C_in*kH*kW)
	            x_col.append(x_)
	    # trick: np.stack
	    return np.stack(x_col, axis=1), H_in, W_in, H_out, W_out  # 1st output: (N, H_out*W_out, C_in*kH*kW)
	```
3. `Conv2D`. 
	1. The shape of `W` is `(C_out, C_in, kH, kW)` and `W_col` is `(C_out, C_in * kH * kW)`
	2. The number of parameters is `C_out x C_in x kH x kW`.
	```Python
	def backward(self, d_out):
		"""
		1. d_out is the gradient from (n+1)th layer, which is the input of nth layer in backprop
		2. gradient updates in col is just simple MLP
		3. d_in is the gradient coming out of nth layer; the propagation follows the same formula as forward prop
		4. d_in_col: need to revert im2col to resolve overlapping in col patches
		"""
		# 1. d_out: (N, C_out, H_out, W_out)
		N, C_out, H_out, W_out = d_out.shape
		# reshape to fit x_col (N, H_out*W_out, C_in*kH*kW)
		d_out = d_out.reshape(N, C_out, -1)  # (N, C_out, H_out*W_out)
		# 2. gradients of weights
		# the summation is over samples in a batch
		self.dW_col += (d_out @ self.x_col).sum(axis=0)  # (C_out, C_in*kH*kW)
		self.dW = self.dW_col.reshape(self.W.shape)
		self.db += d_out.sum(axis=(0, -1))  # (C_out,)
		# 3. calculate `d_in_col` just like with linear layers
		d_in_col = d_out.transpose(0, 2, 1) @ self.W_col  # (N, H_out*W_out, C_in*kH*kW)
		# 4. d_in_col: need to revert im2col to resolve overlapping in col patches
		d_in_col = d_in_col.reshape(N, H_out*W_out, self.C_in, self.kH, self.kW)
		d_in_col = d_in_col.transpose(0, 2, 1, 3, 4)  # (N, C_in, H_out*W_out, kH, kW)
		# iteratre over every pixel
		d_in = np.zeros((N, self.C_in, self.H_in, self.W_in))
		for i in range(H_out):
			for j in range(W_out):
				d_in[:, :, i*self.stride:i*self.stride+self.kH, j*self.stride:j*self.stride+self.kW] += d_in_col[:, :, i*W_out+j, :, :]
		return d_in
	```
4. `MaxPool2D`. Only neurons that produce the maxima get non-zero gradients.
	```Python
	class MaxPool2D:
	    def __init__(self, pool_size):
	        # no `self.W` required coz no learning
	        self.pool_size = pool_size
			
	    def __call__(self, x):
	        N, C, H, W = x.shape
	        x = x.reshape(N, C, H//self.pool_size, self.pool_size, W//self.pool_size, self.pool_size)
	        self.max_mask = (x == x.max(axis=(3,5), keepdims=True))  # same shape as input x
	        x_pooled = x.max(axis=(3, 5))  # (N, C, H_out, W_out)
	        return x_pooled
			
	    def backward(self, d_out):
	        N, C, H_out, W_out = d_out.shape
	        d_in = d_out[:, :, :, np.newaxis, :, np.newaxis]  # (N, C, H_out, 1, W_out, 1)
	        d_in  = d_in * self.max_mask # broadcast (N, C, H_out, pool_size, W_out, pool_size)
	        return d_in.reshape(N, C, H_out*self.pool_size, W_out*self.pool_size)
	```
1. Full implementation at [here](https://github.com/kbjiang/kbjiang.github.io/blob/master/notebooks/CNN-from-scratch.html)
## Lesson learned
1. In model, use `self.relu=ReLU()` instead of `ReLU(self.conv(x))`. 
	1. Layers must be instantiated in `__init__` and reused, so backward can access cached values.
2. Similarly, loss function (`CrossEntropy`) should be defined outside training — new instance has no `self.p` from forward.