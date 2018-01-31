---
title: javascript函数式编程之 代码组合（compose）
date: 2017-07-05 09:27:22
tags:
  - javascript 
  - 前端
---
### 定义   
在函数式编程使用过程中，组合（compose）简单来说就是把两个你喜欢的接入参数一样(最好都是一参的形式，可能过[柯里化](http://www.kuangzen.com/2017/07/05/curry/)`curry`把多参转为一参)的函数把它们组合到一起，产生一个新的函数。如下：
```javascript 
var compose = function(f, g) {
  return function(x) {
    return f(g(x));
  };
};

```
   
在这里，我们把`f`和`g`两个函数组合到一起，它们有共同的参数`x`，显然在`compose`组合时，函数的执行顺序是由右向左执行，先执行`g(x)`再执行`f(g)`，可称之为“左倾”。使用起来如下：   
```javascript 
// 使用组合
var toUpperCase = function(str) { return str.toUpperCase(); };
var reverse = function(str) { return str.split('').reverse().join(''); };
var toUpperCaseAndReverse = compose(reverse, toUpperCase); // toUpperCaseAndReverse由右向左，先执行toUpperCase，再执行reverse
toUpperCaseAndReverse("abcd"); // => "DCBA"

// 不使用组合
var toUpperCaseAndReverse = function(x){ return reverse(toUpperCase(x));};

```

### 代码组合的好处   

代码组合的好处是可以大大的**提高程序的可读性**，比一大堆函数嵌套调用更加简单明了。   
从右向左执行**更加能够反映数学上的含义**。函数式编程的目的和意义是为了让编码与数学函数更加相似，若能更好地贴近数学公式就完美了。   
```javascript 
// 结合律（associativity）
var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
// true
```
   
这个特性就是数学意义上的**结合律**，符合结合律意味着不管你是把 `g` 和 `h` 分到一组，还是把 `f` 和 `g` 分到一组都不重要。   

参考引用自：[JS函数式编程指南](https://www.gitbook.com/book/llh911001/mostly-adequate-guide-chinese/details)

