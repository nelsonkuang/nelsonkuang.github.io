---
title: jQuery.countdown
date: 2016-04-05 10:52:16
tags:
  - jQuery 
  - 前端  
---
a simple, yet easy to use jquery countdown plugin

[Github](https://github.com/hiooyUI/jQuery.countdown)

## how to use it?
```
<script src="your path/jquery.js"></script>
<script src="jquery.countdown.min.js"></script>
```<!-- more -->
```javascript
    $("#container").countDown({
        timeInSecond: 60 * 60,//要倒计时的时间，秒为单位
        displayTpl: "{day}天{hour}小时{minute}分{second}秒", //显示模版
        callback: function () {//倒计时完后执行的回调函数
            alert("倒计时结束！");
        }
    });
```
check out the demo.html example.

or

[live Demo](http://sandbox.runjs.cn/show/uvpedzwn)
