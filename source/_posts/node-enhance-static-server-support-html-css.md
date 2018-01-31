---
title: Node.js 简单优化静态文件服务器处理函数支持css、html文件加载
date: 2016-06-22 18:59:51
tags:
  - 后端 
  - node.js
---
### 思路
紧跟着上一篇[Node.js 入门到实践生成微信数字签名（用于前端调用微信js sdk接口）](http://www.kuangzen.com/2016/04/20/node-learning-chapter-1/)简单优化静态文件服务器处理函数支持css、html文件加载，根据请求文件的后缀名不同来按不同方式输出文件。只作简单处理供学习，实际应用时应更加严谨处理。   

### requestHandlers.js 文件修改static处理函数代码，如下  
<!-- more -->
```javascript

exports.static = (response, request) => {
  console.log("Request handler 'static' was called.")
  const pathname = url.parse(request.url).pathname
  const filepath = path.join('./tmp', 'wwwroot', pathname)
  var stream = fs.createReadStream(filepath, { flags: 'r', encoding: null })
  stream.on('error', () => {
    response.writeHead(404, { 'Content-Type': 'text/html' })
    response.write('404 Not found')
    response.end()
  })
  if (pathname.indexOf('.html') > 0 || pathname.indexOf('.css') > 0 || pathname.indexOf('.js') > 0) {
    var html = ''
    var contentType = pathname.indexOf('.css') > 0 ? 'text/css' : 'text/html' // 针对css文件特别处理
    stream.on('data', function(chunk) {
      html += chunk;
    });

    stream.on('end', function() {
      response.writeHead(200, { 'Content-Type': contentType })
      response.write(html)
      response.end()
    });

  } else {// 其他图片文件等则按流输出
    stream.pipe(response)
  }
}


```  
