---
title: javascript原型链继承
date: 2018-01-31 10:01:13
tags:
  - javascript 
  - 前端
---
### 代码样版   
```javascript 
function Base() {
	this.name='Base';
}
Base.prototype = {
	constructor: Base,
	getName: function() {
		return this.name;
	}
}

// Sub1 inherited from Base through prototype chain
function Sub1() {
	this.name='Sub1';
}
Sub1.prototype = new Base(); // 原型链继承
Sub1.prototype.constructor = Sub1; // 继承完后定义好构造函数, 可选
Sub1.superclass = Base.prototype; // 继承完后定义好基类, 可选

var b = new Sub1(); // 使用
// => Sub1 {name: "Sub1"}
b.getName(); // 使用继承自Base原型链上的getName函数
// =>"Sub1"
Sub1.prototype;
// => Base {name: "Base", constructor: ƒ}


```  