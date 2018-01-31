---
title: 我完成的FreeCodeCamp中的js基础算法编码题12~16 [源码]
date: 2017-02-08 15:41:45
tags:
  - javascript 
  - 前端
  - FreeCodeCamp
---
### 十二、Mutations 确认数组第二个字符串所有字符是否都在第一个串中出现

**思路**：   
1、循环第二个串每个字符检查是否在第一个串中出现   

<!-- more -->
**代码如下**:   

```javascript

function mutation(arr) {
  var len = arr[1].length,
      a = arr[0].toLowerCase(),
      b = arr[1].toLowerCase();
  for(var i=0;i<len;i++){
    if(a.indexOf(b.charAt(i))<0){
      return false;
    }
  }
  return true;
}

mutation(["hello", "hey"]);

```

### 十三、Falsy Bouncer 把数组中所有`false, null, 0, "", undefined, 和 NaN`值元素去掉　

**思路**：   
用`Array.prototype.filter()`把值过滤掉  

**代码如下**:   

```javascript

function bouncer(arr) {
  // Don't show a false ID to this bouncer.
  return arr.filter(function(value){
    return (value!==false && value!==null && value!==undefined && value!==0 && value!=='') && !(typeof value === 'number' && value.toString() === 'NaN');
  });
}

bouncer([7, "ate", "", false, 9]);

```

### 十四、Seek and Destroy 过滤数组中指定值的元素

**思路**：   
1、同上      

**代码如下**:   

```javascript

function destroyer() {
  var len = arguments.length,
      arr = arguments[0],
      tArr = arguments;
  // Remove all the values
  return arr.filter(function(value){
    for(var i=1;i<tArr.length;i++){
      if(value === tArr[i]){
        return false;
      }
    }
    return true;
  });
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);

```

### 十五、Where do I belong 查找指定值在数组中的插入位置

**思路**：   
1、把值与数组中所有元素进行比较得出位置值    

**代码如下**:   

```javascript

function getIndexToIns(arr, num) {
  // Find my place in this sorted array.
  
  var len = arr.length,
      r = 0;
  for(var i=0;i<len;i++){
    if(num>arr[i]){
      r++;
    }
  }
  return r;
}

getIndexToIns([40, 60], 50);

```

### 十六、Caesars Cipher 凯撒加密

**思路**：   
1、直接循环串中所有字符如果是英文字母就加13超出90(z)则回到65(5)开始   

**代码如下**:   

```javascript

function rot13(str) { // LBH QVQ VG!
  var len = str.length,
      rStr = '';
  for(var i=0;i<len;i++){
    var n = str.charCodeAt(i),
        c = str.charAt(i);
    if(n >64 && n<91){
      if(n+13<91){
        c = String.fromCharCode(n+13);
      }else{
        c = String.fromCharCode(64+n+13-90);
      }
    }
    rStr+=c;
  }
  return rStr;
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");


```