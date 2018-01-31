---
title: 新版的安卓版微信内置浏览器(版本6.3.15+)在键盘弹出时，导致遮挡住fixed在底部输入框问题
date: 2016-05-05 18:30:11
tags:
  - 网页兼容性
  - UI设计
  - 前端
---
### 背景   
固定(Fixed)在底部的输入框的页面，如下图评论框   
![Fixed在底部的评论框](http://7xsj8c.com2.z0.glb.clouddn.com/img/bottom_input.png) 

### 解决方案  
可以做成Popup弹出输入框，这样就可以解决所有的iphone和各种乱七八糟的安卓手机的适配问题，如下图：  
![Popup弹出输入框](http://7xsj8c.com2.z0.glb.clouddn.com/img/popup_input.png)   <!-- more -->

### Less样式如下：   

```
@unit: 0.0222222rem;//720px
@u:0.0133333rem;//750px
@ut:0.0133333;//be usd to caculate the value

.f(@x: 75px) { //font-size
    font-size: unit(round(@x*@ut,3),rem);
}

.l(@x: 0) { //left
    left: unit(round(@x*@ut,3),rem);
}

.t(@x: 0) { //top
    top: unit(round(@x*@ut,3),rem);
}

.b(@x: 0) { //bottom
    bottom: unit(round(@x*@ut,3),rem);
}

.r(@x: 0) { //right
    right: unit(round(@x*@ut,3),rem);
}

.w(@x: 0) { //width
    width: unit(round(@x*@ut,3),rem);
}

.h(@x: 0) { //height
    height: unit(round(@x*@ut,3),rem);
}

.br(@x: 0) { //border-radius
    border-radius: unit(round(@x*@ut,3),rem);
}

.lh(@x: 0) { //line-height
    line-height: unit(round(@x*@ut,3),rem);
}

.tc() { //text-align:center;
    text-align: center;
}

.fwb() { //bold
    font-weight: 700;
}

.c_bdb(@c: #efefef ) { //common border bottom
    border-bottom: 1px solid @c;
}

.c_bdt(@c: #efefef ) { //common border bottom
    border-top: 1px solid @c;
}
/**margin**/
.m(@top: 0,@right: 0,@bottom: 0,@left: 0) {
    margin: unit(round(@top*@ut,3),rem) unit(round(@right*@ut,3),rem) unit(round(@bottom*@ut,3),rem) unit(round(@left*@ut,3),rem);
}

.mt(@x: 0) {
    margin-top: unit(round(@x*@ut,3),rem);
}

.mb(@x: 0) {
    margin-bottom: unit(round(@x*@ut,3),rem);
}

.ml(@x: 0) {
    margin-left: unit(round(@x*@ut,3),rem);
}

.mr(@x: 0) {
    margin-right: unit(round(@x*@ut,3),rem);
}


/**padding**/
.p(@top: 0,@right: 0,@bottom: 0,@left: 0) {
    padding: unit(round(@top*@ut,3),rem) unit(round(@right*@ut,3),rem) unit(round(@bottom*@ut,3),rem) unit(round(@left*@ut,3),rem);
}

.pt(@x: 0) {
    padding-top: unit(round(@x*@ut,3),rem);
}

.pb(@x: 0) {
    padding-bottom: unit(round(@x*@ut,3),rem);
}

.pl(@x: 0) {
    padding-left: unit(round(@x*@ut,3),rem);
}

.pr(@x: 0) {
    padding-right: unit(round(@x*@ut,3),rem);
}

.comment-box-bt2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display:block;
    &.hide{
        display:none;
    }
    .title {
        .f(37.5);
        color: #333;
        text-align: center;
        .m(0,40,0,40);
        .pb(20);
        border-bottom: 1px dotted #ccc;
        .mb(35);
    }

    .up_mod {
        .m(0,40,0,40);
        box-sizing: border-box;
    }

    .down_mod {
        .mt(33);
        border-top: 1px solid #ddd;
        text-align:center;
        .ui-btn{
            width:100%;
            display:block;
            text-align:center;
            .f(37.5);
            color:#dfb156;
            .h(100);
            .lh(100);
        }
    }

    .ui-input-text {
        width: 100%;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
        .p(10,20,10,20);
        box-sizing: border-box;
    }

    .box-container {
        position: relative;
        z-index: 102;
        .m(150,80,0,80);
        .p(40,0,0,0);
        background-color: #f0f0f0;
        border-radius: 5px;
    }

    .cover {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0,0.5);
        z-index: 101;
    }
    .close_ico{
        position:absolute;
        .w(21);
        .h(21);
        display:block;
        background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpENkIwNzQwRjA2MDBFNDExODRDRkJFM0JEODk2NTY1OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERThEODVCRTExRTUxMUU2QkNGNkIwNTVCMDI3MDY0NCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERThEODVCRDExRTUxMUU2QkNGNkIwNTVCMDI3MDY0NCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQkY5NEY2QzgzODNFNTExOTZCMEE1ODBFNDIwMEFCNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENkIwNzQwRjA2MDBFNDExODRDRkJFM0JEODk2NTY1OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkzRPzsAAADRSURBVHjapNRRCsIwDAbgmntMhwcZ6j2UDc/Ux8nwHnMD7yEDL2IC3SilbdJY+FtYy0c3ku2stQdjzBPTYT5GPzYHcHpgGsyEOf4Bzs4ZCG3dDfdKeAVrzIK5EfrFnDx4LoBD8EwruE0froRwFKQN8A6VwEkwRKVwFoyhHMyCKTQFXyRgDo3BowTk0BVug2f3HChBa9d6/hi4cgMGnLxXbqR1DEKQvuFbWscgBJeSBoECUNwgUAiKYFCALAxKMAsT2ivBFLz9+UclGMIvzPUnwACRL2r5DMd3AQAAAABJRU5ErkJggg==");
        background-repeat:no-repeat;
        background-size:21*@u;
        .t(12);
        .r(17);
    }
}
```