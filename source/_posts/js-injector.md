---
title: javascript设计模式 - 依赖注入
date: 2016-06-21 15:47:05
tags:
  - javascript设计模式
  - javascript 
  - 前端
---
### 定义   
所有做过.net、java或者php开发的人都应该听过依赖注入dependency injection(DI)或者inverse of control(IOC)控制反转，依赖注入是一种软件设计模式，它让人移除硬生生的写死的依赖关系，让人可以修改它们。依赖可以通过构造函数、定义方法或者设置属性来注入对象。   

### 依赖注入好处   
减小对象与依赖之间的藕合关系。   

不需要对原代码进行修改，直接可以应用到当前代码。   

有助于把客户与设计隔离开，减小设计改变带来的影响。   

让系统不用修改当前代码就可以重新配置。   

可以进行并行或者独立开发。   

让代码更好维护和测试，因为用其他依赖包或者模版代替的话依赖的影响可以被消除。   

### 依赖注入缺点  
当要实例化一种类型，你必须要知道要用什么依赖。   

隐藏了类型的实例化和依赖关系解释逻辑后，如果发生错误比较难查找问题。   

要求你要写更多的代码。   

可能会运行得更慢，因为要以新的关键字来实例化一种类型，把必须要用的相关的关键字对应解释实例化。      
   
<!-- more -->
### 简单的依赖注入实现代码   

```javascript 

       function Injector() {
            this.dependencies = {};
        }
        Injector.prototype.register = function (key, value) {//注册依赖
            this.dependencies[key] = value;
        }
        Injector.prototype.resolve = function (deps, func, scope) {//创建并解释注入依赖后的函数
            var args = [];
            scope = scope || {};
            for (var i = 0; i < deps.length, d = deps[i]; i++) {
                if (this.dependencies[d]) {
                    scope[d] = this.dependencies[d];
                } else {
                    throw new Error('Can\'t resolve ' + d);
                }
            }
            return function () {
                func.apply(scope || {}, Array.prototype.slice.call(arguments, 0));
            }
        }
				//另一种写法，类require.js
        Injector.prototype.define = function (deps, callback) {//创建并解释注入依赖
            var args = [];
            for (var i = 0; i < deps.length, d = deps[i]; i++) {
                if (this.dependencies[d]) {
                    args.push(this.dependencies[d]);
                } else {
                    throw new Error('Can\'t resolve ' + d);
                }
            }
            if (typeof (callback)==='function')
                callback.apply(this, args);
        }

        var myInjector = new Injector();

        var buy = function () {//一个buy模块
          this.name="Nelson";
					this.start = function(){
						document.writeln(this.name + " bought some thing" + '<br>');
					}
        }
        var sell = function () {//一个sell模块
          this.name="Jim";
					this.start = function(){
						document.writeln(this.name + " sold some thing" + '<br>');
					}					
        }

        myInjector.register("buy", new buy());//注册依赖模块
        myInjector.register("sell", new sell());//注册依赖模块

        var deal = myInjector.resolve(['buy', 'sell'], function (deal) {//创建并解释注入依赖buy和sell后的函数
            document.writeln(this.buy.name + '<br>');
					  this.buy.start();
            document.writeln(this.sell.name + '<br>');
					  this.sell.start();
            document.writeln(deal + " relies on both " + this.buy.name + " and " + this.sell.name + '<br><br>');
					  this.buy.name = "Han Meimei";
					  this.sell.name = "Li Lei";					
        });

        deal("Deal");
        console.log(myInjector);
        //另一种写法
        myInjector.define(['buy', 'sell'], function (b, s) {//注入依赖buy和sell
					document.writeln('New Name: ' + b.name + '<br>');
					  b.start();				
					document.writeln('New Name: ' + s.name + '<br>');
					  s.start();
            document.writeln("A deal relies on both " + b.name + " and " + s.name + '<br>');
        });


```

以简单的买卖为例:      
一单买卖，必须有买方和卖方参与   