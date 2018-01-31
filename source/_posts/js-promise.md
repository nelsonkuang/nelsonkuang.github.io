---
title: Javascript Promise让异步操作代码更加灵活
date: 2016-07-27 10:21:18
tags:
  - javascript设计模式
  - javascript 
  - 前端
---
### 定义   
顾名思义，**Promise**是承诺的意思，就是承诺将会发生某个操作，但操作结果有可能是成功的，也有可能是失败的；但无论如何，操作一但完成，立马会返回结果并把结果作为参数去执行相应被绑定的回调函数。*Promise*对象主要是用来做异步计算的，一个*Promise*对象代表一个未完成，但即将完成的操作。   

### 语法   
```javascript 
new Promise( /* executor */ function(resolve, reject) { ... } ); 
```

**参数说明**   
executor   
>通过参数*resolve*和*reject*，一个函数可以被传递到其他函数。executor函数将被提供*resolve*和*reject*函数的Promise履行者立即执行(executor在Promise构造函数之前执行，甚至返回创建的对象)。*Resolve*和*reject*函数是绑定到了promise对象和单独调用他们履行或者拒绝promise对象。Executor预期会初始化一些异步工作和完成后要么调用*resolve*或者*reject*函数去解决promise的最后值或者拒绝它如果有错误发生。   

### 描述   
一个**Promise**代表一个值的代理，我们没必要知道promise是什么时候被创建的。它允许你去关联事件处理器到一个异步的动作的最后的成功值或者失败原理。这样使得异步方法像同步方法那样返回值：代替最后值，异步方法返回一个未来的在某个时间点的带值的promise。   

一个Promise对象是在下面其中一个状态：   
   
- *pending*，挂起状态：初始状态，未履行或者被拒绝   
- *fulfilled*，被履行了:意味着操作成功完成。   
- *rejected*，被拒绝了:表示操作失败了。   

一个被挂起的promise可以成为要么带值的被履行状态或者带原因(错误)而被拒绝的状态。当其中一个发生，关联的事件处理器队列中的promise的then方法将被调用。(如果promise已经被履行或者被拒绝当相应的事件处理器被关联，这个事件处理器将被调用，所以异步操作完成和它的事件处理器被关联之间就没有竞争条件，解耦了)。   <!-- more -->

正因为 `Promise.prototype.then()` 和 `Promise.prototype.catch()` 方法返回的是Promise，所以他们可以被链起来被一起结合操作。使用使得异步嵌套变得更加简单。   
使用Promise进行异步的流程：   
![Promise流程图](http://7xsj8c.com1.z0.glb.clouddn.com/img/QQ%E6%88%AA%E5%9B%BE20160727184459.jpg)   
不使用Promise的普通ajax异步的流程：  
![Ajax流程图](http://7xsj8c.com1.z0.glb.clouddn.com/img/QQ%E6%88%AA%E5%9B%BE20160728093401.jpg)   
   
两者明显的区别执行顺序不一样；前者是串行并且可以进行链式操作，后者是并行执行不能进行链式操作。   
   
### 方法   
Promise.all(iterable)   
>iterable是*Promise*数组，接受一个*Promise*数组，一连串的异步执行完成后，就返回一个Thenable的Promise。   

Promise.race(iterable)   
>iterable是*Promise*数组，接受一个*Promise*数组，只要有一个异步执行完成后，就返回一个Thenable的Promise。   

Promise.reject(reason)   
>始终当作失败，执行reject，返回一个Thenable的Promise。   

Promise.resolve(value)   
>始终当作成功，执行resolve，返回一个Thenable的Promise。   

### 原型   
Promise.prototype.catch(onRejected)   
使用方法看下面例子二   
Promise.prototype.then(onFulfilled, onRejected)   
使用方法看下面例子一   

### 例子   
使用方式 一、   
```javascript 
var promise = new Promise(function(resolve, reject) {
  // 执行异步操作
 
  if (/* 成功 */) {
    resolve("成功的数据");
  }
  else {
    reject("失败信息");
  }
});

promise.then(function(result) {
  console.log(result); // "成功的数据"
}, function(err) {
  console.log(err); // "失败信息"
});
```
使用方式 二、   
```javascript 
var promise = new Promise(function(resolve, reject) {
  // 执行异步操作
 
  if (/* 成功 */) {
    resolve("成功的数据");
  }
  else {
    reject("失败信息");
  }
});

promise.then(function(result) {
  console.log(result); // "成功的数据"
}).catch(function(err) {
  console.log(err); // "失败信息"
});
```
三 链式调用、   
```javascript 
var promise = new Promise(function(resolve, reject) {
  resolve(1);
});
 
promise.then(function(val) {
  console.log(val); // 1
  return val + 2;
}).then(function(val) {
  console.log(val); // 3
});
```
四 接受一个 Promise 数组、   
```javascript 
Promise.all(promisesArr).then(function(resultsArr) {
  //...
});

```
   
   
>本文参考引用：
>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
>http://www.cnblogs.com/rubylouvre/p/3495286.html