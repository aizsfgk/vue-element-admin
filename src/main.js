// css github: https://github.com/necolas/normalize.css
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
// 自己定义的css；重写了element一些css
import '@/styles/index.scss' // global css
// element css
import './styles/element-variables.scss'

// ************ 库 js ************** //
// vue 文件
import Vue from 'vue'
// cookie
import Cookies from 'js-cookie'
// element
import Element from 'element-ui'

// ************ 自己写的js *********** //
// 主app
import App from './App'
// 存储器; 这里保证之后可以使用 this.$store.state
import store from './store'
// 路由器
import router from './router'

import './icons' // icon
import './permission' // permission control -> 也通过接口控制
import './utils/error-log' // error log

// 过滤器
import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 *
 * 模拟数据
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 加载element插件
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  console.log('filter-key: ', key)
  Vue.filter(key, filters[key])
})

// 大概意思应该就是，消息提示的环境配置，设置为开发环境或者生产环境
Vue.config.productionTip = true

new Vue({
  el: '#app',
  router, // 路由
  store, // 全局状态管理，存储
  render: h => h(App)
})
