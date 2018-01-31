---
title: javascript设计模式 - 观察者模式
date: 2016-06-21 15:47:05
tags:
  - javascript设计模式
  - javascript 
  - 前端
---
### 定义   
观察都模式定义了对象间的一对多依赖关系，因此当一个对象的状态发生改变，所有其他有依赖关系的对象将自动被通知和更新   

### 总结   
观察都模式提供了一个订阅模型，当对象订阅了一个事件后，当事件发生后将会被通知。这个模式是包括javascript在内的事件驱动编程的基石。观察都模式使用面向对象设计变得容易，也促进解藕。   

当创建网页应用程序你可能要写很多事件处理函数，当发生特定的事件，这些函数将会被触发。这些通知有选择地接收一个关于这个事件的带明细的事件参数（比如：点击事件中将有鼠标的x和y的位置）。   

这个javascript事件和事件处理函数范例就是一个观察都模式，它的另一个叫法是发布/订阅模式。   

### 图表     
![观察者模式](http://7xsj8c.com1.z0.glb.clouddn.com/img/observer.jpg)    
<!-- more -->
以click事件为例:   
**主题**可以是click，维护一系列的观察者，提供一个接口给观察者订阅或者退订，当状态改变时向观察都发送通知。
而各**观察者**是各clickHandler，是一系列的函数，当主题状态改变时将被通知触发。   

### 代码样版   
代码来源于网络
```javascript 

        // 方式一 
        function Observer() {
            this.fns = [];
        }
        Observer.prototype = {
            subscribe: function (fn) {
                this.fns.push(fn);
            },
            unsubscribe: function (fn) {
                this.fns = this.fns.filter(
                                function (el) {
                                    if (el !== fn) {
                                        return el;
                                    }
                                }
                            );
            },
            update: function (o, thisObj) {
                var scope = thisObj || window;
                this.fns.forEach(
                                function (el) {
                                    el.call(scope, o);
                                }
                            );
            }
        };

        // 测试
        var o = new Observer;
        var f1 = function (data) {
            console.log('Robbin: ' + data + ', 赶紧干活了！');
        };

        var f2 = function (data) {
            console.log('Randall: ' + data + ', 找他加点工资去！');
        };

        o.subscribe(f1);
        o.subscribe(f2);

        o.update("Tom回来了！")

        // 退订f1
        o.unsubscribe(f1);
        //再来验证
        o.update("Tom回来了！");

        // 方式二
        // 通用代码
        var observer = {
            // 订阅
            addSubscriber: function (callback) {
                this.subscribers[this.subscribers.length] = callback;
            },
            // 退订
            removeSubscriber: function (callback) {
                for (var i = 0; i < this.subscribers.length; i++) {
                    if (this.subscribers[i] === callback) {
                        delete (this.subscribers[i]);
                    }
                }
            },
            // 发布
            publish: function (what) {
                for (var i = 0; i < this.subscribers.length; i++) {
                    if (typeof this.subscribers[i] === 'function') {
                        this.subscribers[i](what);
                    }
                }
            },
            // 将对象o具有观察者功能
            make: function (o) {
                for (var i in this) {
                    o[i] = this[i];
                    o.subscribers = [];
                }
            }
        };
        var blogger = {
            recommend: function (obj) {
                var msg = { userID: obj.userID, bloggerID: obj.bloggerID }
                this.publish(msg);
            }
        };

        observer.make(blogger);
        var updateUI = function (obj) {
            console.log("第二步：更新界面，id为[" + obj.userID + "]的用户推荐了id为[" + obj.bloggerID + "]的博客！");
        }

        var updateData = function (obj) {
            console.log("第一步：更新后台数据，id为[" + obj.userID + "]的用户推荐了id为[" + obj.bloggerID + "]的博客！");
        }
        // 订阅
        blogger.addSubscriber(updateData);
        blogger.addSubscriber(updateUI);
        blogger.recommend({
            userID: "65412365",
            bloggerID: "65412369"
        }); // 调用发布

        // 退订
        blogger.removeSubscriber(updateUI);
        blogger.removeSubscriber(updateData);
        blogger.recommend({
            userID: "65412365",
            bloggerID: "65412369"
        }); // 测试退订调用发布

```  