---
title: Javascript 把setTimeout改成delay，延时执行
date: 2016-08-19 17:40:49
tags:
  - javascript 
  - 前端
---
### 背景   
用**setTimeout**多了，总是觉得这函数就差那么一点点，不是很顺手，就萌生了要改造一下此函数的念头；改成可以链式编程的，名字也更加接地气点的，就叫**delay**吧。   
   
### 直接挂原型链代码如下：   
```javascript 
/**
 * 让目标(Object)延时执行，可以链式使用
 * 
 * @param {Number} time
 * @param {Function} doSomething - 
 *                               - @param {Object} self -- 作为参数回调使用
 *                               - @param {Number} startTime -- 作为参数回调使用
 * @return {Object} 
 */
Object.prototype.delay = function (time, doSomething) {
    var self = this,
        startTime = time;
    if (self) {
        setTimeout(function () {
            doSomething(self, startTime);
        }, time);
    }
    return this;
}
```  
   <!-- more -->
### 链式使用例子代码如下：   
```javascript 
document.querySelector('#retarder')
    .delay(1000, function (self) {
        self.innerHTML = 'Hello';
    })
    .delay(1500, function (self) {
        self.innerHTML = 'World';
    });
```  
   
### 非链式使用，由10到0倒计时例子代码如下：   
```javascript 
var el = document.querySelector('#retarder');
for (var i = 0; i <= 10; i++) {
    el.delay(i * 1000, function (self, startTime) {
        self.innerHTML = 10 - startTime / 1000;
    })
}
```  