---
title: 计算6数字含0、不含4的.COM域名总数
date: 2016-08-25 15:46:31
tags:
  - javascript 
  - 前端
  - 一些事一些情
---
### 背景   
今天在群里跟人家讨论6数字含0、不含4的.COM域名总共有多少。码农思维，写个代码输出一下不就知道了吗。然后就捣鼓起来，一开始，以为遍历1000,000就可以得出结果，但这样会忽略了0开头的那批，稍作修改，由1000,000到2000,000就可以了，果然如此。   
   
### 代码如下：   
```javascript 
var c = 2000000,
    result = 0;
for (var i = 1000000; i < c; i++) {
    var str = i.toString().substr(1, 6);
    if (str.indexOf('0') > 0 && str.indexOf('4') < 0) {
        result++;
    }
}
console.log(result); // => 210,248
```  