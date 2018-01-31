---
title: Node.js 入门到实践生成微信数字签名（用于前端调用微信js sdk接口）
date: 2016-04-20 08:59:50
tags:
  - 后端 
  - node.js
---
### 思路
先学习node调试方法，用node搭建简单的web服务器  

### 使用node-inspector来调试node程序  
  - npm全局安装node-inspector  
    `npm install -g node-inspector`
  - 检查是否安装成功，与此同时调试服务已经开启了  
    `node-inspector`  
    若成功应该出现下面提示  
```  
    Node Inspector v0.12.8  
    info  - socket.io started  
    Visit http://127.0.0.1:8080/debug?port=5858 to start debugging
```  
<!-- more -->
  - 用谷歌浏览器chrome打开上面的链接，应该暂时还看不到代码，如下图所示：  
    ![无代码](http://7xsj8c.com2.z0.glb.clouddn.com/img/node-inspector-1.png) 
  - 创建example.js文件，使用官方代码如下：  

```javascript
    const http = require('http')
    
    const hostname = '127.0.0.1'
    const port = 3000
    
    const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World\n')
    })
    
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`)
    })
```  

  - 打开新命令行使用`node --debug-brk example.js`(强制断点在第一行)或者`node --debug example.js`开始调试，如下图，刷新刚才打开的调试页面代码已经出来了，并且断点在第一行，这时可以自由添加断点或者查看变量或者函数值了，按F8可以进行单点调试  
    ![命令行](http://7xsj8c.com2.z0.glb.clouddn.com/img/node-inspector-3.png)   
    ![有代码](http://7xsj8c.com2.z0.glb.clouddn.com/img/node-inspector-2.png) 

### 用node搭建简单的web服务器    
**入口文件index.js**  

```javascript 
const server = require('./server')
const router = require('./router')
const requestHandlers = require('./requestHandlers')

var handle = {}
handle['/'] = requestHandlers.start
handle['/start'] = requestHandlers.start
handle['/upload'] = requestHandlers.upload
handle['/show'] = requestHandlers.show
handle['/wcshare'] = requestHandlers.wcshare
handle['/static'] = requestHandlers.static //处理静态文件输出

server.start(router.route, handle)
```  

**请求处理文件requestHandlers.js(控制器)**  

```javascript  
const querystring = require('querystring')
const fs = require('fs')
const formidable = require('formidable')
const path = require('path')
const url = require('url')
const https = require('https')
const jsSHA = require('jssha')

exports.start = response => {//输出上传文件form界面
    console.log("Request handler 'start' was called.");

    const body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>'

    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(body)
    response.end()
}

exports.upload = (response, request) => {//处理png图片上传并改名
    console.log("Request handler 'upload' was called.")

    const form = new formidable.IncomingForm()
    form.uploadDir = './tmp/wwwroot/static/upload'
    console.log('about to parse')
    form.parse(request, (error, fields, files) => {
        console.log('parsing done')
        fs.renameSync(files.upload.path, './tmp/wwwroot/static/upload/test.png')
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write('received image:<br/>')
        response.write("<img src='/show' />")
        response.end()
    });
}

exports.show = response => {//显示图片
    console.log("Request handler 'show' was called.")
    fs.readFile('./tmp/wwwroot/static/upload/test.png', 'binary', (error, file) => {
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' })
            response.write(error + '\n')
            response.end()
        } else {
            response.writeHead(200, { 'Content-Type': 'image/png' })
            response.write(file, 'binary')
            response.end()
        }
    })
}

function getJsapiTicket(appid, secret, callback) {
    var str1 = ''
    var str2 = ''
    var resp1 = {}
    var resp2 = {}

    //先根据appid与secret获取access_token
    https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
        appid + '&secret=' + secret, response => {
            response.on('data', data => {
                str1 += data
            })
            response.on('end', () => {
                console.log('return access_token:  ' + str1)
                try {
                    resp1 = JSON.parse(str1);
                } catch (e) {
                    return '解析远程access_token JSON数据错误' + str1
                }

                //再根据access_token获取jsapiTicket
                https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' +
                    resp1.access_token + '&type=jsapi', response => {
                        response.on('data', data => {
                            str2 += data
                        })
                        response.on('end', () => {
                            console.log('return ticket:  ' + str2)
                            try {
                                resp2 = JSON.parse(str2);
                            } catch (e) {
                                return '解析远程ticket JSON数据错误' + str2
                            }
                            callback(resp2.ticket)
                        })

                    })


            })




        }).on('error', e => {
        console.error(e)
    });


}
exports.wcshare = (res, request) => {//生成sha1签名，并输出测试
    console.log("Request handler 'wcshare' was called.")
    const appId = '你的appId'
    const appSecret = '你的appSecret'
    const timestamp = parseInt(new Date().getTime() / 1000) + ''  //计算时间戳
    const nonceStr = Math.random().toString(36).substr(2, 15)  //生成随时字符串
    const url = 'http://' + request.headers.host + request.url //当时url
    getJsapiTicket(appId, appSecret, jsapi_ticket => {//获取jsapiTicket
        const string1 = 'jsapi_ticket=' + jsapi_ticket +
            '&noncestr=' + nonceStr +
            '&timestamp=' + timestamp +
            '&url=' + url

        const signature = (new jsSHA(string1, 'TEXT')).getHash('SHA-1', 'HEX')//生成sha1签名
        const body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' +
            'charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<input type="hidden" id="appId" value="' + appId + '" />' +
            '<input type="hidden" id="timestamp" value="' + timestamp + '" />' +
            '<input type="hidden" id="nonceStr" value="' + nonceStr + '" />' +
            '<input type="hidden" id="signature" value="' + signature + '" />' +
            '<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>' +
            '<script src="static/js/main.js"></script>' +
            '</body>' +
            '</html>'
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(body)//输出测试
        res.end()
    })


}

exports.static = (response, request) => {//处理所有静态文件输出，简单的静态文件服务器
    console.log("Request handler 'static' was called.")
    const pathname = url.parse(request.url).pathname
    const filepath = path.join('./tmp', 'wwwroot', pathname)
    var stream = fs.createReadStream(filepath, { flags: 'r', encoding: null })
    stream.on('error', () => {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.write('404 Not found')
        response.end()
    })
    stream.pipe(response)
}

```   

**路由器文件router.js** 

```javascript  
exports.route = (handle, pathname, response, request) => {
  console.log('About to route a request for ' + pathname)
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request)
  } else {
    console.log('No request handler found for ' + pathname)
    response.writeHead(404, {'Content-Type': 'text/html'})
    response.write('404 Not found')
    response.end()
  }
} 
```  

**web服务器文件server.js**  

```javascript 
const http = require('http')
const url = require('url')

exports.start = (route, handle) => {
  http.createServer((request, response) => {
    const pathname = url.parse(request.url).pathname
    console.log('Request for ' + pathname + ' received.')
    route(handle, pathname.indexOf('/static/') > -1 ? '/static' : pathname, response, request)//特殊处理带/static/路径的静态文件
  }).listen(8888)
  console.log('Server has started.')	
}

```  

**前端调用微信分享js文件main.js**  

```javascript
// 所有要调用的 API 都要加到这个列表中   
wx.config({
    debug: false,
    appId: document.querySelector('#appid').value,
    timestamp: document.querySelector('#timestamp').value,
    nonceStr: document.querySelector('#nonceStr').value,
    signature: document.querySelector('#signature').value,
    jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'openLocation',
        'editAddress',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        /*	  'hideMenuItems',
        	  'showMenuItems',
        	  'hideAllNonBaseMenuItem',
        	  'showAllNonBaseMenuItem',
        	  'translateVoice',
        	  'startRecord',
        	  'stopRecord',
        	  'onRecordEnd',
        	  'playVoice',
        	  'pauseVoice',
        	  'stopVoice',
        	  'uploadVoice',
        	  'downloadVoice',
        	  'getNetworkType',
        	  'getLocation',
        	  'hideOptionMenu',
        	  'showOptionMenu',
        	  'closeWindow',
        	  'scanQRCode',
        	  'chooseWXPay',
        	  'openProductSpecificView',
        	  'addCard',
        	  'chooseCard',
        	  'openCard'*/
    ]
});

wx.ready(function() {
    var sharedata = {
        'img': 'http://7xsj8c.com2.z0.glb.clouddn.com/img/5415466.png',
        'title': 'title: kdjfkdjfkdjfkdjfkjdkfjkdjfdkjfkdjkfjdkfjdkjfkdjf...',
        'desc': '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        'url': location.href
    }
    wx.onMenuShareTimeline({ //朋友圈
        title: sharedata.title,
        link: sharedata.url,
        imgUrl: sharedata.img,
        trigger: function(res) {},
        success: function(res) {},
        cancel: function(res) {},
        fail: function(res) {}
    });
    wx.onMenuShareAppMessage({ //转发朋友
        title: sharedata.title,
        desc: sharedata.desc,
        link: sharedata.url,
        imgUrl: sharedata.img,
        trigger: function(res) {},
        success: function(res) {},
        cancel: function(res) {},
        fail: function(res) {}
    });
    wx.onMenuShareQQ({ //转发到QQ
        title: sharedata.title,
        desc: sharedata.desc,
        link: sharedata.url,
        imgUrl: sharedata.img,
        trigger: function(res) {},
        complete: function(res) {},
        success: function(res) {},
        cancel: function(res) {},
        fail: function(res) {}
    });


});



```  

**测试url**  
命令行输入`node --debug index.js`启动程序并进行调试/测试
http://127.0.0.1:8888/start  
http://127.0.0.1:8888/wcshare  
http://127.0.0.1:8888/static/upload/test.png  
等等
**文件目录如下**  
![文件目录结构](http://7xsj8c.com2.z0.glb.clouddn.com/img/node-inspector-4.png)  


参考资料如下  
Node入门 http://www.nodebeginner.org/index-zh-cn.html  
使用 node.js 进行服务器端 JavaScript 编程 http://www.ibm.com/developerworks/cn/web/1107_chengfu_nodejs/
