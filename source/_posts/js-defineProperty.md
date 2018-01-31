---
title: javascript设计模式 - 给对象绑定一个可访问的属性(defineProperty 数据绑定)
date: 2016-06-21 15:47:05
tags:
  - javascript设计模式
  - javascript 
  - 前端
---
### 定义   
在各面向对象语言里面如java,C#等语言开发中，为了提高安全性，经常要对类里面的私有变量进行get、set封装后供外部使用。而在javascript中`Object.defineProperty(obj, prop, descriptor)`也有类似getter、setter。并且可以给getter和setter绑定相应的事件处理。这样，每当prop发生改变(set)s或者执行被读取值(get)时就自动执行已绑定的相应的事件处理函数或者方法。     

### 语法   
```javascript 

Object.defineProperty(obj, prop, descriptor) 

```

### 参数说明   
obj   
即将被定义新属性的对象   

prop   
即将定义的新属性   

descriptor   
对新属性的定义或者修改权限设设置的说明词     

### descriptor参数描述  
configurable   
如果是true的话，这属性的类型是可以更改或者这属性可以被删除。   
默认是false。   

enumerable   
如果是true，这属性在枚兴举时是可见的。   
默认是false。   

descriptor还有下面这些可选的参数:

value   
值可以是任意javascript值(如：number, object, function等等)。   
默认是undefined。   

writable   
如果是true的话，就是可写的。   
默认是false。   

一个可访问的的descriptor还有下面这些参数:   

get   
一个函数服务于属性的getter的函数，或者如果没有getter就是undefined。这函数的返回将用作属性的值。   
默认是undefined。   

set   
一个函数服务于属性的setter的函数，或者如果没有setter就是undefined。函数将于属性被赋新值时被触发。     
默认是undefined。   
   
<!-- more -->
### 简单的defineProperty事例代码   

```javascript 

        var newLine = "<br />";

        //创建一个user-defined对象
        var obj = {};

        //给对象增加一个可访问的属性
        Object.defineProperty(obj, "newAccessorProperty", {
            set: function (x) {
                if (x !== this.oldPropValue) {
                    document.write("in property set accessor" + newLine);
                    this.oldPropValue = x;
                } else {
                    document.write("值没变！" + newLine);
                }
            },
            get: function () {
                document.write("in property get accessor" + newLine);
                return this.oldPropValue;
            },
            enumerable: true,
            configurable: true
        });

        //设置属性值－Set the property value.
        obj.newAccessorProperty = 30;//将触发set函数
        document.write("Property value: " + obj.newAccessorProperty + newLine + newLine);

        obj.oldPropValue=100;//将不触发set函数－will not trigger func set
        document.write("Property value: " + obj.newAccessorProperty + newLine + newLine);//将触发get函数

        document.write("Property value: " + obj.oldPropValue + newLine);//将不触发get函数

```