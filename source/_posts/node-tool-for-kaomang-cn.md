---
title: node开发自动化生成页面工具，用于为 烤芒网kaomang.cng 自动生成新文章页面，并生成相应的依赖页
date: 2016-12-16 17:54:17
tags:
  - 后端 
  - node.js
---
### 思路
[烤芒网](http://kaomang.cn)因为是全静态的网站，但要实现类似CMS系统的功能，要发布文章。所以每次要创建一个新静态文章页面，然后要修改主页文章列表，把新增的文章加上；或者要在左侧快捷菜单列表加上新的文章。   
   
如果每次都要手功创建的话，非常麻烦，现用node实现发布自动化。   
   
### 具体主要实现代码如下：    
**node依赖包配置文件package.json**   

```
{
  "dependencies": {
    "jquery": "^3.1.1",
    "jsdom": "^9.8.3"
  }
}
```
   
**新建文章配置文件new.json,如新增e-0006.html这文章**   
```
{
    "name": "e-0006",
    "title": "一共多少条腿？",
    "description": "<p>一个车夫，赶着一辆马车，车上坐着7个人，每个人背着7个袋，每个袋里装7只大猫，每只大猫带着7只小猫，每个小猫带着7只老鼠作为干粮，问：一共多少条腿？</p>",
    "result": "答：大猫：7*7*7=343只    343*4=1372<br>小猫：343*7=2401只   2401*4=9604<br>老鼠：2401*7=16807只     16807*4=67228<br>人：1+7=8人   8*2=16<br>马：1匹    1*4=4",
    "inLeftNavs": "true",
    "inHomeList": "true",
    "leftFile": "left_panel.html", // 具体页面格式查看kaomang.cn
    "homeFile": "index.html", // 具体页面格式查看kaomang.cn
    "eTplFile":"e-tpl.html" // 具体页面格式查看kaomang.cn
}
```
   <!-- more -->
**主处理js程序new.js**   

```javascript
//读取json
const fs = require('fs');
const jsdom = require("jsdom");
const jQuery = require('jquery');
const newQuestionFile = "new.json";
const newQuestionObj = JSON.parse(fs.readFileSync(newQuestionFile));

// 生成新的题目详情页
fs.readFile(newQuestionObj.eTplFile, 'utf8', function(error, data) {
    data = data.replace('{{title}}', newQuestionObj.title).replace('{{title}}', newQuestionObj.title)
        .replace('{{description}}', newQuestionObj.description).replace('{{result}}', newQuestionObj.result);
    jsdom.env(data, [], function(errors, window) {
        fs.writeFile(newQuestionObj.name + '.html', '<!DOCTYPE html>' + window.document.documentElement.outerHTML, function(error) {
            if (error) {
                throw error;
            }
        });
    });
});

// 追加到首页
if (newQuestionObj.inHomeList == 'true') {
    fs.readFile(newQuestionObj.homeFile, 'utf8', function(error, data) {
        jsdom.env(data, [], function(errors, window) {
            const $ = jQuery(window);
            let html = '<li><a href="/' + newQuestionObj.name + '.html">' + newQuestionObj.title + '</a><i class="circle_ico"></i></li>';
            $('#alg_desc ul').append(html);
            fs.writeFile(newQuestionObj.homeFile, '<!DOCTYPE html>' + window.document.documentElement.outerHTML, function(error) {
                if (error) {
                    throw error;
                }
            });
        });
    });
}

// 追加到左则菜单
if (newQuestionObj.inLeftNavs == 'true') {
    fs.readFile(newQuestionObj.leftFile, 'utf8', function(error, data) {
    	data = '<html><body>' + data + '</body></html>';
        jsdom.env(data, [], function(errors, window) {
            const $ = jQuery(window);
            let html = '<a href="/' + newQuestionObj.name + '.html">' + newQuestionObj.title + '</a>';
            $('#js-mobile-tagcloud').append(html);
            fs.writeFile(newQuestionObj.leftFile, $('body').html(), function(error) {
                if (error) {
                    throw error;
                }
            });
        });
    });
}


```
### 使用方式   
- 按格式填好new.json
- 当前目录下命令行执行`node new`