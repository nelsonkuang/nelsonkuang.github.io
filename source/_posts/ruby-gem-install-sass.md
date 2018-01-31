---
title: windows中ruby环境下用gem安装sass
date: 2016-04-08 09:38:45
tags:
  - sass 
  - scss
  - 前端 
  - ruby
---
### 前言
上一篇文章中windows配置gulp时用到gulp-ruby-sass来编译sass/scss文件，其实也可以用gulp-sass来编译sass/scss文件，两者安装时依赖的环境不一样。  

- gulp-ruby-sass 要先安装Ruby，再用其包环境gem安装sass
- gulp-sass 要安装完成不容易，其依赖于node-sass，要先安装python2，再安装visual studio 2015 express，然后配置vs2015，最后执行 `npm install gulp-sass --save-dev` 来完成安装


### 安装gulp-ruby-sass
由于Gulp-sass过于麻烦，最后选择了gulp-ruby-sass  

1. Ruby安装  
到官网 [http://rubyinstaller.org/](http://rubyinstaller.org/) 下载安装包直接安装。注意，要打勾上环境变量路径，如下图：  
![ruby安装图](http://7xsj8c.com2.z0.glb.clouddn.com/img/20160408095701.png) 

2. Ruby China - RubyGems Mirror镜像安装 sass  <!-- more -->
由于国内网络原因，导致 rubygems.org 的gem 源连接不上，可以通过配置gem sources来修改gem 源。 打开命令行：   

```
gem sources --remove https://rubygems.org/   

gem sources -a https://gems.ruby-china.org/  

gem sources -l  

*** CURRENT SOURCES ***  
https://gems.ruby-china.org/

gem install sass
```    
如果gem sources添加失败可以把 https://gems.ruby-china.org/ 中的 **https** 改为 **http** 试试。 `gem sources --remove https://rubygems.org/` 是移除官方源 https://rubygems.org/ ； `gem sources -a https://gems.ruby-china.org/` 是添加 https://gems.ruby-china.org/ 国内源； `gem sources -l` 是查看当前源；最后关键的一步 `gem install sass` 就是安装sass！

