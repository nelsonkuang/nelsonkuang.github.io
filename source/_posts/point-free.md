---
title: javascript函数式编程之 无参风格（point-free style）
date: 2017-07-12 08:46:35
tags:
  - javascript 
  - 前端
---
### 定义   
无参风格是一种编程范例，其中函数定义**不能识别它们所运行的参数（或“点”）**。 相反，它只是组合(`compose`)其他函数，在其子函数中操纵参数的组合器。    
因为严格使用组合可以很好地适应等式推理的程序，它也是某些编程语言的自然风格，包括APL和诸如Forth之类的连接语言。    
例子如下：  

```javascript 
// 比如，现成的函数如下：
var toUpperCase = function(str) { return str.toUpperCase(); };
var split = function(str) { return str.split(''); };
var reverse = function(arr) { return arr.reverse(); };
var join = function(arr) { return arr.join(''); };

// 现要由现成的函数定义一个point-free函数toUpperCaseAndReverse
var toUpperCaseAndReverse = _.flowRight(join, reverse, split, toUpperCase); // 自右向左流动执行
// toUpperCaseAndReverse是一个point-free函数，它定义时并无可识别参数。只是在其子函数中操纵参数。flowRight是引入了lodash库的组合函数，相当于compose组合函数
console.log(toUpperCaseAndReverse('abcd')); // => DCBA

```

### 无参风格的好处   

无参风格的好处就是不需要费心思去给它的参数进行命名，把一些现成的函数按需组合起来使用。   
还可以让代码保持简结和通用，但需要注意的是，在使用时是`point-free`风格，但其子函数定义时必然就不那么`point-free`，这个要自己去权衡。   


参考引用自：[Tacit programming](https://en.wikipedia.org/wiki/Tacit_programming)