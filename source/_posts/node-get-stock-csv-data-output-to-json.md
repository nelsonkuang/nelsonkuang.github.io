---
title: Node.js 获取yahoo股票csv数据并封闭成为接口输出json数据
date: 2016-06-22 18:59:50
tags:
  - 后端 
  - node.js
---
### 思路
紧跟着上一篇[Node.js 入门到实践生成微信数字签名（用于前端调用微信js sdk接口）](http://www.kuangzen.com/2016/04/20/node-learning-chapter-1/)添加多一个路由为/stock和相应的处理函数，先从yahoo接口获取数据，再转化成为json输出   

### requestHandlers.js 文件添加处理函数代码，如下  
<!-- more -->
```javascript

exports.stock = (res, req) => {
  const arg = url.parse(req.url, true).query
  const stockName = arg.stockname
  const startDateArr = arg.startdate.split('-')
  const endDateArr = arg.enddate.split('-')
  const startY = startDateArr[0]
  const startM = startDateArr[1] - 1
  const startD = startDateArr[2]
  const endY = endDateArr[0]
  const endM = endDateArr[1] - 1
  const endD = endDateArr[2]
  const stockAPI = 'http://table.finance.yahoo.com/table.csv?s=' + stockName + '&f=' + endY + '&d=' + endM + '&e=' + endD + '&c=' + startY + '&a=' + startM + '&b=' + startD + '&g=d&ignore=.csv' // 定义stock api的url
  var resultStr = ''
  http.get(stockAPI, response => {
    response.on('data', data => {
      resultStr += data
    })
    response.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application:json' })
      res.write(JSON.stringify(csv2json(resultStr)))
      res.end()
    })
  }).on('error', e => {
    console.error(e)
  })
}

function trim(str){ //删除左右两端的空格
　return str.replace(/(^\s*)|(\s*$)/g, '')
}

function csv2json(str){
  var jsonArr = []
  str = trim(str)
  const lines = str.split('\n')
  if(lines.length > 1){
    const heads = lines[0].split(',')
    for(var i=1; i < lines.length; i++){
      var obj = {}
      var temArr = lines[i].split(',')
      for(var j=0; j < heads.length; j++){
        obj[heads[j]] = temArr[j];
      }
      jsonArr.push(obj);
    }
  }
  return jsonArr
}

```

### index.js添加路由代码, 如下: 

```javascript

handle['/stock'] = requestHandlers.stock

```