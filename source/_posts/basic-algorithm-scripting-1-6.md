---
title: 我完成的FreeCodeCamp中的js基础算法编码题1~6 [源码]
date: 2017-02-08 14:32:48
tags:
  - javascript 
  - 前端
  - FreeCodeCamp
---
### 一、Reverse a String 字符串倒序输出

**思路**：   
1、打散成为单字符数组   
2、把数组反序   
3、把反序后的数组合拼成为结果字符串   
<!-- more -->
**代码如下**:   

```javascript

function reverseString(str) {
  
  return str.split('').reverse().join('');
}

reverseString("hello");

```

### 二、Factorialize a Number 求一个整数的阶乘

**思路**：   
比较简单，就一个循环乘上去   

**代码如下**:   

```javascript

function factorialize(num) {
  var r = 1;
  for(var i=1;i<=num;i++){
    r = r * i;
  }
  return r;
}

factorialize(5);

```

### 三、Check for Palindromes 回文检查

**思路**：   
1、先把特殊字符去掉   
2、把字符串反序   
3、比较顺序与序串是否相等   

**代码如下**:   

```javascript

function palindrome(str) {
  var pattern = new RegExp("[%--_`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——| {}【】‘’\"；：”“'。，、？]");        
  var rs = '',
      sr = '';
  for (var i = 0; i < str.length; i++) {
      rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  rs = rs.toLowerCase();
  sr = rs.split('').reverse().join('');
  // Good luck!
  if(rs == sr)
  {
    return true;
  } else{
    return false;
  }
}



palindrome("eye");

```

### 四、Find the Longest Word in a String 查看英文句子中长度最长单词

**思路**：   
1、把句子中的所有单词抽出来   
2、逐一进行比较取出最大值     

**代码如下**:   

```javascript

function findLongestWord(str) {
  var arr = str.split(' '),
      len = 0;
  for(var i=0;i<arr.length;i++) {
    var tLen = arr[i].length;
    if(tLen > len) {
      len = tLen;
    }
  }
  return len;
}

findLongestWord("The quick brown fox jumped over the lazy dog");

```

### 五、Title Case a Sentence 把英文句子中所有的单词的首字母大写

**思路**：   
1、把句子全部小写   
2、把句子中的所有单词抽出来组成数组    
3、把数组所有单词首字母改成大写   
4、合并数组成为新的字符串   

**代码如下**:   

```javascript

function titleCase(str) {
  str = str.toLowerCase();
  var arr = str.split(' ');
  for(var i=0;i<arr.length;i++){
    var tem = arr[i];
    arr[i] = tem.substring(0,1).toUpperCase() + tem.substring(1);   
  }
  return arr.join(' ');
}


```

### 六、Return Largest Numbers in Arrays 求所有子数组的最大元素

**思路**：   
1、用空间换时间概念求出所有子数组中的最大值      

**代码如下**:   

```javascript

function largestOfFour(arr) {
  var rArr = [];
  // You can do this!
  for(var i=0;i<arr.length;i++){
    var tArr = [];
    for(var j=0;j<arr[i].length;j++){
      tArr[arr[i][j]] = 1;
    }
    rArr[i] = tArr.length - 1;
  }
  return rArr;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);


```