---
title: 我完成的FreeCodeCamp中的中级算法编码题 3-6
date: 2017-02-17 14:58:05
tags:
  - javascript 
  - 前端
  - FreeCodeCamp
---
### 一、Sum All Numbers in a Range 求两数之间的所有数字的总和

**思路**：   
1、求最大值   
2、求最小值   
3、循环求和   
<!-- more -->
**代码如下**:   

```javascript

function sumAll(arr) {
  var min = Math.min(arr[0],arr[1]),
      max =Math.max(arr[0],arr[1]),
      r = 0;
  for(var i=min;i<=max;i++){
    r+=i;
  }
  return r;
}

sumAll([1, 4]);

```

### 二、Diff Two Arrays 求两个数组的非共同元素

**思路**：   
循环过滤出来   

**代码如下**:   

```javascript

function diffArray(arr1, arr2) {
  var newArr = [];
  // Same, same; but different.
  newArr = arr1.filter(function(value){
    return arr2.indexOf(value) < 0;
  });
  
  return newArr.concat(arr2.filter(function(value){
    return arr1.indexOf(value) < 0;
  }));
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

```

### 三、Roman Numeral Converter 把数字转化成为罗马数字

**思路**：   
1、把各位数字逐个拼接     

**代码如下**:   

```javascript

function convertToRoman(num) {
  var arr_0_9 = ['','I','II','III','IV','V','VI','VII','VIII','IX'],
      arr_10_90 = ['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'],
      arr_100_900 = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM'],
      arr_1000_9000 = ['','M','MM','MMM','MMMM','MMMMM','MMMMMM','MMMMMMM','MMMMMMMM','MMMMMMMMM'];
  var str = num.toString(),
      str2Arr = [],
      r = '';
  if(str.length<4){
    switch (str.length){
      case 3:
        str = '0'+str;
        break;
      case 2:
        str = '00'+str;
        break;    
      case 1:
        str = '000'+str;
        break; 
      default:
        str = '0000';
    }    
  }
  str2Arr = str.split('');
  for(var i=0;i<4;i++){
    switch (i){
      case 3:
        r+= arr_0_9[parseInt(str2Arr[i])];
        break;
      case 2:
        r+= arr_10_90[parseInt(str2Arr[i])];
        break;    
      case 1:
        r+= arr_100_900[parseInt(str2Arr[i])];
        break; 
      default:
        r+= arr_1000_9000[parseInt(str2Arr[i])];
    }     
  }
  
  return r;
}

convertToRoman(36);

```

### 四、Wherefore art thou 查找对象

**思路**：   
1、循环查找       

**代码如下**:   

```javascript

function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [],
      keys = Object.keys(source),
      kLen = keys.length;
  // Only change code below this line
  collection.forEach(function(obj){
    var match = true;
    for(var i=0;i<kLen;i++){
      if(!obj.hasOwnProperty(keys[i])){
        match = false;
        break;
      }else{
        if(source[keys[i]] != obj[keys[i]]){
          match = false;
          break;          
        }
      }
    }
    if(match){
      arr.push(obj);
    }
  });
  
  // Only change code above this line
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

```

### 五、Search and Replace 查找替换 

**代码如下**:   

```javascript

function myReplace(str, before, after) {
  var c = before.charAt(0),
      newAfter='';
  if(c<'A' || c>'Z'){
    newAfter = after.charAt(0).toLowerCase() + after.substr(1);
  }else{
    newAfter = after.charAt(0).toUpperCase() + after.substr(1);
  }
  var reg = new RegExp(before,"g");
  return str.replace(reg,newAfter);
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");

```

### 六、Pig Latin 把词转化为猪拉丁语     

**代码如下**:   

```javascript

function translatePigLatin(str) {
  var vStr = 'aeiou',
      ends = ['way','ay'],
      i = 0,
      cStr='';
  while(str.charAt(i)!==undefined && vStr.indexOf(str.charAt(i))<0){
    cStr += str.charAt(i);
    i++;
  }
  if(cStr.length>0){
    return str.substr(cStr.length) + cStr + ends[1];
  }else{
    return str + ends[0];   
  }
}

translatePigLatin("consonant");


```