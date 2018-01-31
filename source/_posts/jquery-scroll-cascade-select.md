---
title: jquery-scroll-cascade-select
date: 2016-03-21 14:57:45
tags: 
  - jQuery
  - css3 
  - 前端
---
Scroll Cascade Select, a light-weight flexible Scroll Picker similiar to Mobiscroll. 

Support swipping up / down, mouse dragging up / down are supported too

[Github](https://github.com/nelsonkuang/jquery-scroll-cascade-select)

## how to use it?


check the address.html example.

or

[live Demo](http://sandbox.runjs.cn/show/zmqwsarf), please use mobile phone mode to view the demo!

<!-- more -->
## License:

[MIT](https://github.com/nelsonkuang/jquery-scroll-cascade-select/blob/master/LICENSE)

## Todo:

~~Add mouse dragging effect.~~

Add more examples.

Add scroll triggering options changing.

### 实现原理:
每一个滑轮用flex流式布局以保证都在同一行排列各各滑轮，用css3的transform3D来实现划动效果，滑屏放开时，计算当时的速度，然后滑轮以当时的速度进行匀减速运动一直到停止，因为每个选择框的高度都是固定40像数，停止的位置要按40的倍数计算而成。

如果是支持触屏就绑定touch事件，如果不支持就绑定mouse事件。

每个滑轮的滑动变化都可以绑定一个回调函数用来触发级联变化。

每个滑轮都可以根据输入的固定格式的数组数据进行重新渲染。
