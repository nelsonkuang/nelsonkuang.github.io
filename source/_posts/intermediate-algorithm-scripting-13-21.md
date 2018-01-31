---
title: 我完成的FreeCodeCamp中的中级算法编码题 13-21
date: 2017-02-17 15:39:17
tags:
  - javascript 
  - 前端
  - FreeCodeCamp
---
### 十三、Sum All Odd Fibonacci Numbers 斐波纳契数列求和　

**思路**：   
循环求和  

<!-- more -->
**代码如下**:   

```javascript

function sumFibs(num) {
        var pre = 0,
            now = 1,
            next = 1,
            r = 0;
        while (pre <= num) {
            if (pre % 2 === 1) {
                r += pre;
            }
            if (now <= num && now % 2 === 1) {
                r += now;
            }
            pre = next;
            now = now + next;
            next = next + now;
        }
        return r;
}

sumFibs(4);

```

### 十四、Sum All Primes 素数求和

**思路**：   
1、同上      

**代码如下**:   

```javascript

function sumPrimes(num) {
  var r=0;
  for(var i=2;i<=num;i++){
    var isPrime = true;
    for(var j=2;j<=i;j++){
      if(i%j===0 && i!==j){
        isPrime = false;
        break;
      }
    }
    if(isPrime){
      r+=i;
    }
  }
  return r;
}

sumPrimes(10);

```

### 十五、Smallest Common Multiple 查找最小公倍数

**代码如下**:   

```javascript

    function smallestCommons(arr) {
        var len = arr.length,
            max = Math.max(arr[0], arr[len - 1]),
            min = Math.min(arr[0], arr[len - 1]),
            cmMaxValue = 1,
            cm = max,
            nowValue = max,
            j = 1,
            isSCM = true,
            r = 0;
        for (var i = min; i <= max; i++) {
            cmMaxValue *= i;
        }
        while (cm <= cmMaxValue) {
            for (var n = min; n < max; n++) {
                if (cm % n !== 0) {
                    isSCM = false;
                    break;
                }
            }
            if (isSCM) {
                r = cm;
                break;
            }
            j++;
            cm = j * max;
            isSCM = true;
        }
        return r;
    }


smallestCommons([1,5]);

```

### 十六、Finders Keepers 根据条件查找元素

**代码如下**:   

```javascript

function findElement(arr, func) {
        var r = [];
        r = arr.filter(func);
        return r[0];
}

findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; });


```

### 十七、Drop it 根据条件删除元素

**代码如下**:   

```javascript

    function dropElements(arr, func) {
        // Drop them elements.
        var dArr = arr.filter(func),
            len = arr.length,
            rArr = [];
        if (dArr.length > 0) {
            return arr.slice(arr.indexOf(dArr[0]));
        } else {
            return [];
        }
    }

dropElements([1, 2, 3], function(n) {return n < 3; });


```

### 十八、Steamrolle 扁平化多维数组

**代码如下**:   

```javascript

function steamrollArray(arr) {
  // I'm a steamroller, baby
  return arr.reduce(function (acc, val) {
    return acc.concat(Array.isArray(val) ? (val.length > 0 ? steamrollArray(val) : []) : val);
  }, []);
}

steamrollArray([1, [2], [3, [[4]]]]);


```

### 十九、Binary Agents 二进制转普通字符

**代码如下**:   

```javascript

function binaryAgent(str) {
  var arr = str.split(' '),
      len = arr.length,
      rStr = '';
  for(var i=0;i<len;i++){
    rStr += String.fromCharCode(parseInt(arr[i],2));
  }
  return rStr;
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");


```

### 二十、Everything Be True 检查key是否都在对象数组中

**代码如下**:   

```javascript

function truthCheck(collection, pre) {
  var isTruthy = true;
  // Is everyone being true?
  collection.forEach(function(obj){
    if(!obj[pre]||obj[pre]===''){
      isTruthy = false;
      return false;
    }
  });
  return isTruthy;
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");



```

### 二十一、Arguments Optional 可选参数

**代码如下**:   

```javascript

function addTogether() {
  if(arguments.length===0){
    return undefined;
  } else if(arguments.length===1){
    if(typeof arguments[0] !== 'number'){
      return undefined;
    } else{
      var a = arguments[0];
      return function(b){
        if(typeof b === 'number'){
          return a+b;          
        }else{
          return undefined;
        }
      };
    }
  } else if(arguments.length===2){
    var x = arguments[0],
        y = arguments[1];
    if(typeof x !== 'number' || typeof y !== 'number'){
      return undefined;
    } else{
      return x + y;
    }
  }
  return undefined;
}

addTogether(2,3);

```