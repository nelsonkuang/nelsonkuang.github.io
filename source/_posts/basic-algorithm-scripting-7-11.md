---
title: 我完成的FreeCodeCamp中的js基础算法编码题7~11 [源码]
date: 2017-02-08 15:14:51
tags:
  - javascript 
  - 前端
  - FreeCodeCamp
---
### 七、Confirm the Ending 确认字符串是否以指定的串结尾

**思路**：   
1、主要是用`String.prototype.substr()`获取尾串是否与目标相等   

<!-- more -->
**代码如下**:   

```javascript

function confirmEnding(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor
  if(target.length > str.length){
    return false;
  } else{
    if(str == target || str.substr(str.length- target.length) == target){
      return true;
    }else{
      return false;
    }
  }
}

confirmEnding("Bastian", "n");

```

### 八、Repeat a string repeat a string 重复一字符串

**思路**：   
比较简单，拼上去就行  

**代码如下**:   

```javascript

function repeatStringNumTimes(str, num) {
  var tem = str;
  // repeat after me
  if(num<0){
    str = '';
  } else {
    for(var i=1;i<num;i++){
      str += tem;
    }
  }
  return str;
}

repeatStringNumTimes("abc", 3);

```

### 九、Truncate a string 截取字符串超出用...表示

**思路**：   
1、主要是用`String.prototype.slice()`把首串截出来与...合拼      

**代码如下**:   

```javascript

function truncateString(str, num) {
  var len = str.length;
  // Clear out that junk in your trunk
  if(len > num){
    if(num>3){
      str = str.slice(0,num - 3) + '...';
    } else {
      str = str.slice(0,num) + '...';
    }
  }
  return str;
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);

```

### 十、Chunky Monkey 等分数组变成多个子数组

**思路**：   
1、把数组等分并求余   
2、组成新的数组     

**代码如下**:   

```javascript

function chunkArrayInGroups(arr, size) {
  // Break it up.
  var len = arr.length,
      m = len%size,
      div = 1,
      rArr = [];
  if(len > size){
    div = Math.floor(len/size);
    for(var i=0;i<div;i++){
      rArr.push(arr.slice(i*size,(i+1)*size));
    }
    if(m>0){
      rArr.push(arr.slice(m*(-1)));
    }
  }
  return rArr;
}

chunkArrayInGroups(["a", "b", "c", "d"], 2);

```

### 十一、Slasher Flick 把数组中的前面N个元素去掉

**思路**：   
1、直接用`Array.prototype.splice()`把数组分割   

**代码如下**:   

```javascript

function slasher(arr, howMany) {
  // it doesn't always pay to be first
  if(howMany === 0){
    return arr;
  }
  if(arr.length <= howMany){
    return [];
  }else{
    arr.splice(0,howMany);
    return arr;
  }
}

slasher([1, 2, 3], 2);


```