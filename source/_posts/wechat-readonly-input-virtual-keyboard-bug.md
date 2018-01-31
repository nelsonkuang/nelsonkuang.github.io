---
title: 安卓版微信内置浏览器input设置为readonly后，键盘仍然会弹出bug
date: 2016-05-03 09:09:32
tags:
  - 网页兼容性
  - jQuery
  - 前端
---
### 应用场景
1. 使用mobicroll时，对input已经设置了readonly
2. 其他input用作组件时，不需要输入，设置了readonly

### 解决思路  
只需要给input绑定一个click后设置为blur事件就可以了   

```javascript
            $($input).click(function () {//fixed 虚拟键盘弹出
                $(this).blur();
            });
```   
