---
title: javascript 高阶函数
date: 2017-07-03 16:19:35
tags:
  - javascript 
  - 前端
---
### 定义   
在js的世界里面，有一种函数，它可以接受另一个函数作为参数，这种函数，我为称之为高阶函数（Higher-order function）。我们日常使用过程中非常常见的一种形式就是回调函数，我们经常在写的带callback的函数，其实属于高阶函数；setTimeOut、setInterval可以接收函数进行异步操作；Array.sort也可以接收函数进行排序处理；进入ES6时代，Gruntjs、Gulp和webpack等打包工具的出现，我们可以大胆使用ES6/ES7的一些新的函数，如map、reduce、filter等函数   

### 高阶函数好处   

新入门的程序员通常都会疑惑将函数作为参数传递在哪些地方才有用呢？在很多程序中，都有一两个这种实例：**有一些基本的算法会被编写多次，但是可能每次稍有不同**。这就是发挥使用函数作为参数所长的地方。   
您可以做的事情是**将算法的基本结构编写到一个函数中**。然后，**对少许部分进行修改，并将其作为函数参数补充回来**。这样**可以在一个函数中增加很多可定制的因素**。您还可以添加其他函数参数为将来进行扩展。**这种组合函数可以减少编程的冗余，通过扩展，还可以减少在一个程序中反复编写相同的算法所引起的错误**。

<!-- more -->
### 高阶函数的一些应用例子   

1. jQuery ajax回调函数
```javascript 
        $.ajax({
            url: 'http://localhost:8000/api/v1/entry/1/',
            type: 'GET',
            dataType: 'json',
            success: function (data) { // success接收回调函数
                console.log(data);
            }
        });
```

2. setTimeout/setInterval计时器函数
```javascript 
setTimeout(function() {
	console.log('我将会在一秒后输出！！！');
}, 1000);

var n = 0;
setInterval(function() {
    n++; // 我每隔１秒加１
	console.log('我现在的值是' + n); // => 1 , 2 , 3 ...
}, 1000);

```

3. Arry.sort数组排序函数
```javascript 
var arr = [3, 8, 1, 2];
arr.sort(function (x, y) {
    return x - y; // 升序
}); // => [1, 2, 10, 20]

arr.sort(function (x, y) {
    return y - x; // 降序
}); // => [20, 10, 2, 1]
```

4. Arry.map数组遍历函数
```javascript 
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(function(item) { // 数组所有元素进行求平方得到新的数组
	return Math.pow(item, 2);
}); // => [1, 4, 9, 16, 25, 36, 49, 64, 81]


```

5. Arry.reduce数组降阶简化函数
```javascript 
var arr = [1, 3, 5, 7, 9];
arr.reduce(function (x, y) { // 数组求和
    return x + y;
}); // => 25

```

6. Arry.filter数组过虑函数
```javascript 
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0; // 在一个Array中，过虑掉偶数，只保留奇数
});
r; // => [1, 5, 9, 15]

```

