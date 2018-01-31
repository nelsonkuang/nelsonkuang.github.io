---
title: 我完成的FreeCodeCamp中的高级算法编码题
date: 2017-02-17 15:56:51
tags:
  - javascript 
  - 前端
  - FreeCodeCamp
---
### 一、Validate US Telephone Numbers 美国电话号码正则匹配
 
<!-- more -->
**代码如下**:   

```javascript

function telephoneCheck(str) {
  // Good luck!
  var arr = str.match(/1?\s?\d{3}[\s-]?\d{3}[\s-]?\d{4}|1?\s?\(\d{3}\)[\s-]?\d{3}[\s-]?\d{4}/);
  return arr!==null && arr[0].length === str.length;
}


telephoneCheck("555-555-5555");


```

### 二、Record Collection 更新对象记录集

**代码如下**:   

```javascript

// Setup
var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [ 
        "Let It Rock", 
        "You Give Love a Bad Name" 
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [ 
        "1999", 
        "Little Red Corvette" 
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": [ ]
    },
    "5439": {
      "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

// Only change code below this line
function updateRecords(id, prop, value) {
  if(value===''){
    delete collection[id][prop];
  }else{
    if(prop === 'tracks'){
      if(collection[id].hasOwnProperty('tracks')){
        collection[id][prop].push(value);        
      }else{
        collection[id].tracks = [];
        collection[id][prop].push(value);
      }
    }else{
      collection[id][prop] = value;   
    }    
  }

  
  return collection;
}

// Alter values below to test your code
updateRecords(5439, "artist", "ABBA");

```

### 三、Symmetric Difference 求多数组的对称差元素集

**代码如下**:   

```javascript

 function sym() {
        var arr = [],
            rArr = [];
        for (var i = 0; i < arguments.length; i++) {
            arr.push(arguments[i]);
        }
        arr = arr.reduce(function (acc, val) {
            var tArr = [];
            for (var i = 0; i < acc.length; i++) {
                if (val.indexOf(acc[i]) < 0) {
                    tArr.push(acc[i]);
                }
            }
            for (var j = 0; j < val.length; j++) {
                if (acc.indexOf(val[j]) < 0) {
                    tArr.push(val[j]);
                }
            }
            return tArr;
        }, []);
        arr.forEach(function(val){
          if(rArr.indexOf(val)<0){
            rArr.push(val);
          }
        });
        return rArr;
    }

sym([1, 2, 3], [5, 2, 1, 4]);

```

### 四、Exact Change 找零计算    

**代码如下**:   

```javascript

    function checkCashRegister(price, cash, cid) {
        var change = cash - price,
            totalCash = 0,
            rArr = [],
            isDone = false;
        // Here is your change, ma'am.
        cid.forEach(function (arr) {
            totalCash += arr[1];
        });
        if (change > totalCash) {
            return 'Insufficient Funds';
        } else if (change == totalCash) {
            return 'Closed';
        } else {
            for (var i = cid.length - 1; i >= 0; i--) {
                if (cid[i][1] < change) {
                    if (cid[i][1] !== 0) {
                        rArr.push(cid[i]);
                        change -= cid[i][1];
                    }
                    if (cid[i][0] === 'PENNY') {
                        return 'Insufficient Funds';
                    }
                } else {
                    var t = 0;
                    switch (cid[i][0]) {
                        case 'PENNY':
                            t = Math.round(change * 100) * 0.01;
                            rArr.push(['PENNY', t]);
                            change -= t;
                            if (change >= 0.01) {
                                return 'Insufficient Funds';
                            }
                            break;
                        case 'NICKEL':
                            t = parseInt(change / 0.05) * 0.05;
                            if (t > 0) {
                                rArr.push(['NICKEL', t]);
                                change -= t;
                            }
                            break;
                        case 'DIME':
                            t = parseInt(change / 0.1) * 0.1;
                            if (t > 0) {
                                rArr.push(['DIME', t]);
                                change -= t;
                            }
                            break;
                        case 'QUARTER':
                            t = parseInt(change / 0.25) * 0.25;
                            if (t > 0) {
                                rArr.push(['QUARTER', t]);
                                change -= t;
                            }
                            break;
                        case 'ONE':
                            t = parseInt(change / 1) * 1;
                            if (t > 0) {
                                rArr.push(['ONE', t]);
                                change -= t;
                            }
                            break;
                        case 'FIVE':
                            t = parseInt(change / 5) * 5;
                            if (t > 0) {
                                rArr.push(['FIVE', t]);
                                change -= t;
                            }
                            break;
                        case 'TEN':
                            t = parseInt(change / 10) * 10;
                            if (t > 0) {
                                rArr.push(['TEN', t]);
                                change -= t;
                            }
                            break;
                        case 'TWENTY':
                            t = parseInt(change / 20) * 20;
                            if (t > 0) {
                                rArr.push(['TWENTY', t]);
                                change -= t;
                            }
                            break;
                        case 'ONE HUNDRED':
                            t = parseInt(change / 100) * 100;
                            if (t > 0) {
                                rArr.push(['ONE HUNDRED', t]);
                                change -= t;
                            }
                            break;
                    }
                    if (change === 0) {
                        break;
                    }
                }
            }
            return rArr;
        }
    }

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);

```

### 五、Inventory Update 更新存储池 

**代码如下**:   

```javascript

function updateInventory(arr1, arr2) {
        // All inventory must be accounted for or you're fired!
        var len = arr1.length;
        arr2.forEach(function (val) {
            var isInArr1 = false;
            for (var i = 0; i < len; i++) {
                if (arr1[i][1] === val[1]) {
                    arr1[i][0] += val[0];
                    isInArr1 = true;
                }
            }
            if (!isInArr1) {
                arr1.push(val);
            }
        });
        return arr1.sort(function (a, b) {
            return a[1] > b[1];
        });
    }

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);

```

### 六、No repeats please 求全排列中不带重复元素的数列的个数     

**代码如下**:   

```javascript

function permAlone(str) {
        var arr = str.split(''),
            rArr = [],
            count = 0;
        var swap = function (arr, i, j) {
            if (i != j) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        };
        (function fn(n) { //为第n个位置选择元素  
            for (var i = n; i < arr.length; i++) {
                swap(arr, i, n);//换
                if (n + 1 < arr.length - 1) //判断数组中剩余的待全排列的元素是否大于1个  
                {
                    fn(n + 1);//从第n+1个下标进行全排列  
                } else {
                    rArr.push(arr.join(''));
                }
                swap(arr, i, n);//复原
            }
        })(0);
        count = rArr.length;
        rArr.forEach(function (val) {
            if (val.match(/([a-z]{1})\1/)) {
                count--;
            }
        });
        return count;
    }

permAlone('aab');


```

### 七、Friendly Date Ranges 日期段的友好显示     

**代码如下**:   

```javascript

function makeFriendlyDates(arr) {
        var fArr = arr[0].split('-'),
            tArr = arr[1].split('-'),
            fY = fArr[0],
            fM = fArr[1],
            fD = fArr[2],
            tY = tArr[0],
            tM = tArr[1],
            tD = tArr[2],
            mArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            dArr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'],
            today = new Date(),
            rArr = [];
        if (arr[0] === arr[1]) {
            rArr[0] = mArr[parseInt(fM) - 1] + ' ' + dArr[parseInt(fD) - 1] + ', ' + fY;
            return rArr;
        }
        if ((new Date(parseInt(tY), parseInt(tM) - 1, parseInt(tD))).getTime() - (new Date(parseInt(fY), parseInt(fM) - 1, parseInt(fD))).getTime() < 3600000 * 24 * 365)
        {
            if (parseInt(fY) === 2016) {
                rArr[0] = mArr[parseInt(fM) - 1] + ' ' + dArr[parseInt(fD) - 1];
            } else {
                rArr[0] = mArr[parseInt(fM) - 1] + ' ' + dArr[parseInt(fD) - 1] + ', ' + fY;
            }
            if (tM === fM && tY===fY) {
                rArr[1] = dArr[parseInt(tD) - 1];
            } else {
                rArr[1] = mArr[parseInt(tM) - 1] + ' ' + dArr[parseInt(tD) - 1];
            }
        } else {
            rArr[0] = mArr[parseInt(fM) - 1] + ' ' + dArr[parseInt(fD) - 1] + ', ' + fY;
            rArr[1] = mArr[parseInt(tM) - 1] + ' ' + dArr[parseInt(tD) - 1] + ', ' + tY;
        }
        return rArr;
    }

ma


```

### 八、Make a Person 面向对象练习     

**代码如下**:   

```javascript

var Person = function(firstAndLast) {
    var arr = firstAndLast.split(' '),
        first = arr[0],
        last = arr[1],
        fullName = firstAndLast;
    this.getFirstName = function(){
      return first;
    };
    this.getLastName = function(){
      return last;
    };
    this.getFullName = function(){
      return fullName;
    };  
    this.setFirstName = function(f){
      first = f;
      fullName = first + ' ' + last;
    };
    this.setLastName = function(l){
      last = l;
      fullName = first + ' ' + last;      
    };  
    this.setFullName = function(fn){
      arr = fn.split(' ');
      fullName = fn;
      first = arr[0];
      last = arr[1];
    }; 
};

var bob = new Person('Bob Ross');
bob.getFullName();


```

### 九、Map the Debris 根据海拔高度求轨道周期     

**代码如下**:   

```javascript

function orbitalPeriod(arr) {
        var GM = 398600.4418;
        var earthRadius = 6367.4447;
        var rArr = [];
        arr.forEach(function (obj) {
            var newObj = {};
            newObj.name = obj.name;
            newObj.orbitalPeriod = Math.round(2 * 3.14159265 * Math.pow(Math.pow(earthRadius + obj.avgAlt, 3) / GM, 0.5));
            rArr.push(newObj);
        });
        return rArr;
    }

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);


```

### 十、Pairwise 求数组两元素之和为第二个参数的组合的下标之和     

**代码如下**:   

```javascript

function pairwise(arr, arg) {
        var len = arr.length,
            r = 0,
            cArr = [];
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (arr[i] + arr[j] === arg && i !== j && !(cArr.indexOf(i) > 0 || cArr.indexOf(j) > 0)) {
                    r = r + i + j;
                    cArr.push(i);
                    cArr.push(j);
                    break;
                }
            }
        }
        return r;
    }

pairwise([1,4,2,3,0,5], 7);


```