---
title: javascript函数式编程之 声明式编程（declarative programing）
date: 2017-07-12 10:17:31
tags:
  - javascript 
  - 前端
  - SQL
---
### 定义   
在计算机科学中，声明式编程是一种编程范式 - 构建计算机程序的结构和元素的一种风格 - 专注于表达计算逻辑，而不需要描述其控制流程。   
   
应用这种风格的许多语言尝试通过**描述程序在问题领域中必须完成的内容来最大限度地减少或消除副作用**，而不是描述如何将其作为编程语言原函数的序列直到实现。这与**命令式编程**相反，命令式编程在显式步骤中实现算法。   
   
声明式编程通常将程序视为**形式逻辑的理论**，并将其计算为该逻辑空间中的扣除。声明式编程可以大大简化写入并行程序。   
   
通用声明性语言包括数据库查询语言（例如SQL，XQuery），还有js库D3.js也是声明式编程的代表。  
<!-- more -->
求一个list里所有值的和例子，如下：  

```javascript 
// 命令式编程：
var numbers = [1,2,3,4,5]
var total = 0;
for(var i = 0; i < numbers.length; i++) {
  total += numbers[i]
}
console.log(total) //=> 15

// 而在声明式编程方式里，我们使用 reduce 函数

var numbers = [1,2,3,4,5]
var total = numbers.reduce(function(sum, n) {
  return sum + n
}, 0); // 0是初始值
console.log(total); //=> 15

```
   
还有像下面的SQL语句也是非常声明式的，非常容易读懂，但复杂的检索操作交给了计算机去处理

```
SELECT * from books
INNER JOIN authors

WHERE books.author_id = authors.id
```

### 声明式编程的好处   

如果我们花时间去学习(或发现)声明式的可以归纳抽离的部分，它们能为我们的编程带来巨大的便捷。   
我可以少写代码，这就是通往成功的捷径。而且它们能让我们站在更高的层面是思考。   
我们可以专注于**要做什么**，让计算机来帮我们优化**如何实现**。


参考引用自：   
[Declarative programming](https://en.wikipedia.org/wiki/Declarative_programming)   
[声明式编程和命令式编程的比较](http://www.vaikan.com/imperative-vs-declarative/)