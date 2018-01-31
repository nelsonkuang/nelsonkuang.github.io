---
title: 我完成的FreeCodeCamp中的中级算法编码题 7-12
date: 2017-02-17 15:28:38
tags:
  - javascript 
  - 前端
  - FreeCodeCamp
---
### 七、DNA Pairing 生成DNA配对

<!-- more -->
**代码如下**:   

```javascript

function pairElement(str) {
  var arr = str.split(''),
      rArr = [];
  for(var i=0;i<arr.length;i++){
    switch(arr[i]){
      case 'A':
        rArr.push(["A","T"]);
        break;
      case 'T':
        rArr.push(["T","A"]);
        break;
      case 'C':
        rArr.push(["C","G"]);
        break;
      case 'G':
        rArr.push(["G","C"]);
        break;        
    }
  }
  return rArr;
}

pairElement("GCG");

```

### 八、Missing letters 求出缺小的字母 

**代码如下**:   

```javascript

function fearNotLetter(str) {
  var s = str.charCodeAt(0),
      len = str.length,
      e = str.charCodeAt(len - 1),
      matchStr = '',
      r = '';
  if(e - s + 1 == len){
    return undefined;
  }else{
    for(var i = s;i <= e;i++){
      matchStr += String.fromCharCode(i);
    }
    for(var j = 0;j < matchStr.length; j++){
      var t = matchStr.charAt(j);
      if(str.indexOf(t)<0){
        r += t;
      }
    }
    return r;    
  }
}

fearNotLetter("abce");

```

### 九、Boo who 判断值是否为boolean值      

**代码如下**:   

```javascript

function booWho(bool) {
  // What is the new fad diet for ghost developers? The Boolean.
  return typeof bool === 'boolean';
}

booWho(null);

```

### 十、Sorted Union 求多数组元素去重

**代码如下**:   

```javascript

function uniteUnique() {
  var arr = [],
      rArr = [];
  for(var n=0;n<arguments.length;n++){
    arr.push(arguments[n]);
  }
  rArr = arr.reduce(function(a,b){
    var t = [];
    for(var i=0;i<b.length;i++){
      if(a.indexOf(b[i])<0){
        t.push(b[i]);
      }
    }
    return a.concat(t);
  },[]);
  return rArr;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);

```

### 十一、Convert HTML Entities 特殊字符转义

**代码如下**:   

```javascript

function convertHTML(str) {
  // &colon;&rpar;
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}

convertHTML("Dolce & Gabbana");


```

### 十二、Spinal Tap Case 句子转化成为标准URL格式

**代码如下**:   

```javascript

function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
  var arr = str.match(/[a-zA-Z][a-z]*/g);
  return arr.join('-').toLowerCase();
}

spinalCase('This Is Spinal Tap');


```