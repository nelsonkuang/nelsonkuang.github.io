---
title: vuex + vue-router实战之简单Tabs开发
date: 2016-07-15 14:54:11
tags:
  - vue.js
  - javascript 
  - 前端 
---
### 背景   
　　唠叨几句，前端框架何其多，明星级的就那么几个，能冲出国门风靡全球的国产框架，目前只有大牛尤雨溪Evan You出的vue.js，必须顶力支持。   
　　之前自己捣鼓写了两个vue组件,　觉得用起来非常顺手，感觉编程思想有点像react但比react更加易用。
　　问题来了，之前一直是孤立的来玩单个组件，那么如果一个复杂的单面程序里面有很多组件，并且需要切换不同的视图的时候该如果处理呢？   

### 解决方案   
- 用vue-router来分别咱由页面不同的视图，根据hash值的不同实现
- 用vuex来管理不同组件的状态，以保证视图的切换时不会丢失状态　　　

### vuex + vue-router实现一个简单的Tabs应用   
先看程序主入口文件main.js，在这里要注入store和安装路由<!-- more -->   
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import store from './store'
import Foo from './components/Foo.vue'
import Bar from './components/Bar.vue'

Vue.config.debug = true
new Vue({
  store,
  el: 'body',
  components: {
    App
  },
  render: h => h(App)
})

// 安装路由
Vue.use(VueRouter)

// 创建一个路由实例
const router = new VueRouter()

router.map({
  '/foo': {
    component: Foo
  },
  '/bar': {
    component: Bar
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/foo'
})
// 启动路由，注意要带store
router.start({
  store,
  components: { App }
}, 'body')

```

主模块文件app.vue，使用v-link作为tab菜单进行导航   
```html
<template>
  <div id="app">

  <h1>A Simple Vuex And Vue-router Based Example</h1>
  <div class="nav">
    <!-- 用v-link导航 -->
    <a v-link="{ path: '/foo' }">Go to Foo</a>
    <a v-link="{ path: '/bar' }">Go to Bar</a>
  </div>
  <!-- 路由占位坑，根据路由不同切换相应的视图组件 -->
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  text-align: center;
}
h1 {
  color: #00BCD4;
  font-weight: 700;
}
.nav {
  text-align: left;
}
.nav a{
  text-align: center;
  padding: 20px;
  background-color: #ffdf7d;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  border-bottom: 1px solid #fff;
  display: inline-block;
}
.nav a.v-link-active {
  border-bottom: 1px solid #ffdf7d;;
}
#foo, #bar{
  background-color: #ffdf7d;
  padding: 20px;
  text-align: left;
}
</style>
```

子模块文件Foo.vue，子组件要用vuex管理状态   
```html
<template>
<div id="foo">
  <p>{{ foo }}</p>
  <input v-model="foo" @blur="fooChange(foo)">
</div>
</template>

<script>
import { fooChange } from '../actions'
export default {
  vuex: {
    getters: {
      fooValue: state => state.foo
    },
    actions: { fooChange }
  },
  data () {
    return {
      foo: this.fooValue
    }
  }
}
</script>
```

子模块文件Bar.vue，子组件要用vuex管理状态   
```html
<template>
<div id="bar">
  <p>{{ bar }}</p>
  <input v-model="bar" @blur="barChange(bar)">
</div>
</template>


<script>
import { barChange } from '../actions'
export default {
  vuex: {
    getters: {
      barValue: state => state.bar
    },
    actions: { barChange }
  },
  data () {
    return {
      bar: this.barValue
    }
  }
}
</script>
```

状态管理文件store.js，其原理就是用一个json对象，用来管理应用所有的状态   
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 根状态对象.
// 每个 Vuex 实例就是一个状态树.
const state = {
  foo: 'This is foo!',
  bar: 'This is bar!'
}

// mutations是一系列的用于修改状态的方法.
// 每个mutation动作处理函数都用state作为第一个参数，接着就是额外的自己定义的参数
// 为了便于调试所有mutation都是异步的

const mutations = {
  FOOCHANGE (state, foo) {
    state.foo = foo
  },
  BARCHANGE (state, bar) {
    state.bar = bar
  },
  SETSTATE (state, foo, bar) {
    state.foo = foo
    state.bar = bar
  }
}

// 一个Vuex实例包含state、actions
// 和mutations.因为actions和mutations就是那不依赖实例自己的函数，
// 并且可以容易被测试或者热加载的

export default new Vuex.Store({
  state,
  mutations
})

```

动作处理文件actions.js，其实就是用于通知相应mutations处理   
```javascript
export const fooChange = ({ dispatch }, foo) => {
  dispatch('FOOCHANGE', foo)
}
export const barChange = ({ dispatch }, bar) => {
  dispatch('BARCHANGE', bar)
}
export const setState = ({ dispatch }, foo, bar) => {
  dispatch('SETSTATE', foo, bar)
}

```

详细代码及使用说明请点击查看[Github上的源 码](https://github.com/nelsonkuang/Vuex-And-Vue-router-Tabs)   
[在线效果示例](http://sandbox.runjs.cn/show/853qy1rr)   
