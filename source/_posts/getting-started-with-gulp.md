---
title: 用Gulp配置前端自动化
date: 2016-04-08 08:39:49
tags:
  - gulp
  - sass 
  - scss
  - 前端 
  - node.js
---
### 前言
平时习惯用Grunt管理前端项目，由于近期项目需要，开始转向了Gulp，用起来给我最大的感受是流程更加清晰，链式的配置流程,用 `.pipe()` 把所有的流程串联起来，更加方便；而用Grunt，平时习惯是按每个task来配置流程，但总体上都差不多，基本上两者都可以满足日常项目需求。

### 项目中的出现使用场景
1. js语法检查
2. 编译Sass/Scss
3. 压缩js文件
4. 合并js文件
5. 清空样式、js
6. 监听文件变化,自动执行上面指定的任务  <!-- more -->

### Window环境下Gulp安装
1. 确保已经安装了node.js环境并配置好npm全局环境，并在项目所在的目录创建了package.json (可以用 `npm init` 创建) 项目文档  

2. 全局环境安装Gulp  
`npm install -g gulp`   
为了确保是否安装完成可以输入 `gulp -v` 查看Gulp的版本  

3. 把Gulp安装到项目本地  
`npm install --save-dev gulp`    
要先在命令行定位到项目当前目录再执行命令安装， `--save-dev` 是用来更新到package.json文件中的devDependencies值，用来定义项目依赖关系的，以后方便项目移植 (在package.json文件中定义好项目依赖关系的好处是，别人拿到项目文件夹后，只需要执行 `npm install` 即可自动从npm环境中加载好所需的依赖包，可以立即使用) 。  

4. 安需安装项目依赖包  

` npm install gulp-jshint gulp-ruby-sass gulp-minify-css gulp-autoprefixer gulp-concat gulp-uglify gulp-rename gulp-clean --save-dev  `

其中各包的作用如下：
  - gulp-jshint   检查js脚本
  - **gulp-ruby-sass   编译Sass** ( 注意：安装后需要ruby环境下安装sass才可以正常运行，详细请看下一篇[windows中ruby环境下用gem安装sass](http://www.kuangzen.com/2016/04/08/ruby-gem-install-sass/ "windows中ruby环境下用gem安装sass") )
  - gulp-minify-css   css压缩
  - gulp-autoprefixer   自动添加兼容各内核浏览器的css3前缀
  - gulp-concat    文件合并
  - gulp-uglify js压缩混淆
  - gulp-clean 清空文件夹
  - gulp-rename 重命名  
     
  
### 新建gulpfile.js文件，配置如下:  

```javascript  
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint'),            // 检查脚本
    sass = require('gulp-ruby-sass'),           // 编译Sass
    minifycss = require('gulp-minify-css'),     // css压缩
    autoprefixer = require('gulp-autoprefixer'),// 自动添加css3前缀
    concat = require('gulp-concat'),            // 合并
    uglify = require('gulp-uglify'),            // js压缩
    clean = require('gulp-clean'),              // 清空文件夹
    rename = require('gulp-rename');            // 重命名


// 检查脚本
gulp.task('jshint', function () {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function () {
    var cssSrc = './src/scss/*.scss',
        cssDst = './dist/css';
    return sass(cssSrc, { style: 'expanded' })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));
});

// 压缩js文件
gulp.task('jsuglify', function () {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    gulp.src(jsSrc)
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// 合并,压缩js文件
gulp.task('jsconcat', function () {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    gulp.src(jsSrc)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// 清空样式、js
gulp.task('clean', function () {
    gulp.src(['./dist/css', './dist/js'], { read: false })
        .pipe(clean());
});

// 默认任务
gulp.task('default', function () {
    gulp.run('jshint', 'sass', 'jsuglify');

    // 监听文件变化
    var jsSrc = './src/js/*.js',
        cssSrc = './src/scss/*.scss';
    gulp.watch([jsSrc, cssSrc], function () {
        gulp.run('jshint', 'sass', 'jsuglify');
    });
});
```
  
### 配置完成，命令行下执行 `gulp` 命令开始使用！  
 `gulp` 
  
### 目录结构如下：  
![目录结构](http://7xsj8c.com2.z0.glb.clouddn.com/img/20160408110023.png)