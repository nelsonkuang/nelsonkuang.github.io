---
title: 新版的安卓版微信内置浏览器(版本6.3.15+)在键盘弹出时不会触发resize动作，导致遮挡住输入框问题
date: 2016-04-06 16:04:30
tags:
  - 网页兼容性
  - javascript 
  - jQuery
  - 前端
---

### 应用场景
1. 填写表单页面
2. 固定(Fixed)在底部的输入框的页面，如评论框

### 解决思路
##### 针对第一种情况：  

先判断是否为新版的安卓版微信内置浏览器(版本6.3.15+), 当然经测试**华为手机**除外，用旧坑办法解决。  

然后判断当手机键盘弹出时，用margin把可视区蹭高50%(即`$(window).height()/2`)的高度、如margin-top为-50%的你的元素的高度；收回键盘时再恢复margin为0。  

如何判断当手机键盘有没有弹出？可以捕获focus和blur事件来确认，还可以绑定click点击事件来监听，如果效果不明显可以加上setTimeout来确保等键盘弹出或者收回后再执行focus或者blur的绑定事件。<!-- more -->

##### 针对第二种情况： 
 
当然首先填了**ios及华为手机**对fixed支持不好的旧坑，如何填？最简单的方法是键盘弹出时把fixed改为absolute，收回时再设回为fixed。具体js判断方法如下：
```
function isHuaweiOrIOS() {
    var ua = navigator.userAgent;
    return navigator.userAgent.match(/iPhone|iPod|iPad|HUAWEI|HONOR|H60-L[0-1]{1}[1-3]{1}/i);
}
```
进入正题，针对安卓版，思路其实还是跟第一种情况一样，这里不用margin,直接用bottom,把bottom设为屏的50%的高度即`$(window).height()/2`；收回键盘时再设回bottom为0。当然要借助focus、blur和click的监听来确认手机键盘是否弹出。


### 如何判断是否为新版的安卓版微信内置浏览器

```javascript
function isAndroidNewWechat() {
    var isMobile = {
        UCBrowser: function () {
            return navigator.userAgent.match(/UCBrowser/i);
        },
        MicroMessenger: function () {
            return navigator.userAgent.match(/MicroMessenger/i);
        },
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iPad: function () {
            return navigator.userAgent.match(/iPad/i);
        },
        iPhone: function () {
            return navigator.userAgent.match(/iPhone/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPod|iPad/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    },
    result = false;
    if (isMobile.Android() && isMobile.MicroMessenger()) {
        var wv = navigator.userAgent.match(/MicroMessenger\/\d+\.\d+\.\d+/i)[0],
        wvv = 0;
        try {
            if (wv) {
                wvv = parseInt(wv.replace("MicroMessenger/", "").split(".").join(""));
                if (wvv >= 6315) {
                    result = true;
                }
            }
        } catch (e) {
            result = true;
        }
    }
    return result;
}

```