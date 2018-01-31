---
title: 各类域名总数统计
date: 2016-08-26 11:11:50
tags:
  - javascript 
  - 前端
  - 一些事一些情
---
### 背景   
域名无限，但精品域名资源有限，所以近几年来优质域名价格水涨船高，现在就来统计一下所有优质域名的个数吧。   
   
### 统计js代码如下：   
```javascript 
// 1数10个
// 2数
console.log(Math.pow(10, 2)); // => 100
// 3数
console.log(Math.pow(10, 3)); // => 1,000
// 4不含0,4
console.log(Math.pow(8, 4)); // => 4,096
// 4数含0,4
console.log(Math.pow(10, 4) - Math.pow(8, 4)); // => 5,904
// 5数不含0,4
console.log(Math.pow(8, 5)); // => 32,768
// 5数含0,4
console.log(Math.pow(10, 5) - Math.pow(8, 5)); // => 67,232
// 6数不含0,4
console.log(Math.pow(8, 6)); // => 262,144
// 6数含0,4
console.log(Math.pow(10, 6) - Math.pow(8, 6)); // => 737,856

// 1字母26个
// 两声域名
console.log(Math.pow(20, 2)); // => 400
// 两字母非两声
console.log(Math.pow(26, 2) - Math.pow(20, 2)); // => 276
// 三声域名
console.log(Math.pow(20, 3)); // => 8,000
// 三字母非三声
console.log(Math.pow(26, 3) - Math.pow(20, 3)); // => 9,576
// 四声域名
console.log(Math.pow(20, 4)); // => 160,000
// 四字母非四声
console.log(Math.pow(26, 4) - Math.pow(20, 4)); // => 296,976
// 五声域名
console.log(Math.pow(20, 5)); // => 3,200,000
```  