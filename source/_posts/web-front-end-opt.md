---
title: web前端优化实用集锦
date: 2016-11-18 11:09:08
tags:
  - 前端
---
### 一、页面级优化　　　
1. 减少 HTTP请求数
(1). 从设计实现层面简化页面   
(2). 合理设置 HTTP缓存   
(3). 资源合并与压缩   
(4). CSS Sprites   
(5). Inline Images,如base64   
(6). Lazy Load Images,如使用jQuery.lazyload.js
2. 将外部脚本置底
3. 异步执行 inline脚本(其实原理和上面是一样，保证脚本在页面内容后面加载。)
4. Lazy Load Javascript（如使用requirejs/seajs）
5. 将 CSS放在 HEAD中
6. 异步请求 Callback（如果时效性允许的话，可以考虑在 DOMLoaded事件触发的时候加载，或者使用 setTimeout方式来灵活的控制加载的时机。）
7. 减少不必要的 HTTP跳转（很多人都会忽略链接最后是否带 ’/'，假如你的服务器对此是区别对待的话，那么你也需要注意，这其中很可能隐藏了 301跳转，增加了多余请求。）
8. 避免重复的资源请求   
   

### 二、代码级优化
1. Javascript
   - DOM   
  a. HTML Collection（HTML收集器，返回的是一个数组内容信息）   
HTMLCollection类型的集合，在平时使用的时候大多将它作为数组来使用，因为它有 length属性，也可以使用索引访问每一个元素。不过在访问性能上则比数组要差很多。   
  b. Reflow & Repaint
   - 慎用 with
   - 避免使用 eval和 Function
   - 减少作用域链查找（如用局部变量缓存全局变量 ）
   - 数据访问（Javascript中的数据访问包括直接量(字符串、正则表达式) 、变量、对象属性以及数组，其中对直接量和局部变量的访问是最快的，对对象属性以及数组的访问需要更大的开销。）
   - 字符串拼接（在 Javascript中使用"+" 号来拼接字符串效率是比较低的，因为每次运行都会开辟新的内存并生成新的字符串变量，然后将拼接结果赋值给新变量。与之相比更为高效的做法是使用数组的 join方法，即将需要拼接的字符串放在数组中最后调用其 join方法得到结果。不过由于使用数组也有一定的开销，因此当需要拼接的字符串较多的时候可以考虑用此方法。）
2. CSS选择器   
   - class样式的命名方式
   - 使用权重排名，如id  class  tagName
   - 浏览器对选择符的解析是从右往左进行的!
<!-- more -->
3. HTML
   - 布局
     - 使用p元素修饰文本，而不是布局；默认p是自动提供边缘，而且其他样式也是浏览器默认提供的。
     - 避免使用br分行，可以使用block元素或CSS显示属性来代替。
     - 避免使用hr来添加水平线，可使用CSS的border-bottom 来代替。
     - 不到关键时刻不要使用div标签。
     - 尽量少用Tables来布局。
     - 可以多使用Flex Box
     - 使用CSS 来调整边距等。
   - 验证
     - 在工作流中添加验证功能：使用验证插件如HTMLHint或SublineLinter帮助你检测代码错误。
     - 使用HTML5文档类型
     - 确保HTML的层次结构易于维护，要避免元素嵌套处于左开状态。
     - 保证添加各元素的结束标签。
     - 删除不必要的代码 ；没有必要为自关闭的元素添加结束标签；Boolean 属性不需要赋值，如果存在则为True;
   - 代码格式
     - 格式一致性使得HTML代码易于阅读，理解，优化，调试。
   - 语义标记
     - 使用h1(h2,h3…)表示标题，ul或ol实现列表
     - 注意使用article 标签之前应添加h1标签；
     - 选择合适的HTML5语义元素如header，footer,nav,aside;
     - 使用p描述Body 文本，HTML5 语义元素可以形成内容，反之不成立。
     - 使用em和strong标签替代i和b标签。
     - 使用label元素，输入类型，占位符及其他属性来强制验证。
     - 将文本和元素混合，并作为另一元素的子元素，会导致布局错误
4. Image压缩
     - 如使用webp图片格式
     - 动态加载不同尺寸图片   
   

### 三、优秀解决方案
 - [京东2016版首页改版前端总结](https://aotu.io/notes/2016/12/26/jd-index-2016-summary/)
 - [京东前端：三级列表页持续架构优化](http://www.infoq.com/cn/articles/Jingdong-three-list-page-continuous-structure-optimization) 
 - [天猫前端的双11](http://tmallfe.github.io/%E5%8F%8C11/2016/03/08/tmall-1111.html)
 - [15年双11手淘前端技术巡演 - H5性能最佳实践](https://github.com/amfe/article/issues/21)
 - [如何为用户省电](https://github.com/amfe/article/issues/26)
 - [vue+webpack在“双十一”导购产品的技术实践](https://github.com/amfe/article/issues/24)
 - [2015年手机淘宝前端团队article](https://github.com/amfe/article)