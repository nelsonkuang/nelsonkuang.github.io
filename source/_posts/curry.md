---
title: javascript函数式编程之 柯里化（curry）
date: 2017-07-05 15:57:30
tags:
  - javascript 
  - 前端
---
### 定义   
柯里化（curry）的概念其实可以简单理解为这样，本来有个已存在的函数需要接收多个参数的，现我想要根据需求由此函数打造成一个**只有一个或者指定数量参数**的新的函数。这里我们引用`lodash`库来举例，如下：
`<script src="https://cdn.bootcss.com/lodash.js/4.17.4/lodash.min.js"></script>`
```javascript 
// 非curry化的replace函数如下：
var myReplace = function(what, replacement, str) {
  return str.replace(what, replacement);
};

// curry化后的replace函数如下：
var replace = _.curry(function(what, replacement, str) { // 注意，此函数如果接收3个参数就会直接返回结果，如果接收2个或者1个参数就返回一个函数
  return str.replace(what, replacement);
});

// curry化后，我们可以按需定制咖喱套餐了：），注意，这里是自左而右进行柯里化的
var replaceFuck = replace('Fuck'); // replaceFuck是新的函数，非常灵活，可以接收1个(返回一个新函数)或者2个参数(返回结果)
var replaceFuckWithXxxx = replaceFuck('Xxxx'); // 这里把三参数按自己需求定制转成只有１个参数的新函数，这样就可以结合前一篇文章的compose来使用了
var replaceFuckWithXxxx('Fuck you'); // => Xxxx you

// 非curry化的add函数如下：
var myAdd = function(x, y) {
  return x + y;
};

// curry化后的add函数如下：
var add = _.curry(function(x, y) { 
  return x + y;
});

// curry化后，我们可以按需定制咖喱套餐了：）
var addOne = add(1); // =>新函数 function(x){return x+1;}
var addTen = add(10); // =>新函数 function(x){return x+10;}
var minusOne = add(-1); // =>新函数 function(x){return x-1;}

addOne(100); // => 101 像数学公式f(x)一样的形式
addTen(100); // => 110
minusOne(100); // => 99

```

### 代码柯里化（curry）的好处   

通过简单地传递几个参数，就能**动态创建实用的新函数**；   
而且还能带来一个额外好处，那就是保留了**数学的函数定义**，尽管参数不止一个；与数学函数贴近这也是函数式编程设计的初衷。    

参考引用自：[JS函数式编程指南](https://www.gitbook.com/book/llh911001/mostly-adequate-guide-chinese/details)
