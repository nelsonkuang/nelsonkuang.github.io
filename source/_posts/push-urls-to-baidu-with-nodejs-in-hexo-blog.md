---
title: 用node.js向百度推送hexo博客所有链接
date: 2016-04-22 13:35:40
tags:
  - 后端 
  - node.js
---
### 背景
百度提供了4种方式用于提交网站链接，分别是主动推送(实时)，自动推送，sitemap和手动提交，其中主动推送是最快的。自动摧送是加js在页面上，但要打开页面才能执行推送，sitemap没爬到时也没有执行推送，手动提交还要登陆到百度网站上面去提交效率太低。  

### 实现思路  
读取blog自动生成的baidusitemap.xml文件里面所有的url并post到baidu

### 用node.js执行推送  
**先按装依赖包**  
两个sitemap文件装了后会每次deploy会自动生成sitemap.xml与baidusitemap.xml文件。  
xml2js用于把xml转化成为json。<!-- more -->

```
npm install hexo-generator-sitemap
npm install hexo-generator-baidu-sitemap
npm install xml2js --save
```

**文件处理js(pushtobaidu.js)代码如下：**  

```javascript  
const http = require('http')
const fs = require('fs')
const xml2js = require('xml2js')

var urls = []
const parser = new xml2js.Parser()
fs.readFile('./public/baidusitemap.xml', 'utf-8', (error, data) => {//先读取文件
    if (error) {
        console.log(error)
    } else {
        parser.parseString(data, (err, result) => {//xml转为json
            urls = result.urlset.url.map(obj => obj.loc)//读取所有url存到数组
            const reqData = urls.join('\n')//用换行符把所有url连成字符串
            const postOptions = {
                host: 'data.zz.baidu.com',
                path: '/urls?site=www.kuangzen.com&token=XXXXXX',//这里填写你从百度拿到的token
                port: '80',
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'Content-Length': reqData.length
                }
            }
            postData(reqData, postOptions)//post给百度

        })
    }

})

function postData(reqData, postOptions) {
    const postReq = http.request(postOptions, response => {
    	response.setEncoding('utf8')
        response.on('data', data => {
        	data = JSON.parse(data)
            if (data.success)
                console.log('post data success!')
            else
                console.log(data.error)
        })
    })

    postReq.on('error', e => {
        console.log('problem with request: ' + e.message);
    })

    // post the data
    postReq.write(reqData)
    postReq.end()
}

```  

**每新增有blog文就可以在命令行执行摧送**   

```  
node pushtobaidu
```  
  
结果：post data success!

