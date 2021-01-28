import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

// 注册VueX组件
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// webpack 语法
//
// 
const modulesFiles = require.context('./modules', true, /\.js$/)
// console.log(modulesFiles)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
//
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // console.log(moduleName)
  const value = modulesFiles(modulePath)
  // console.log(value)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store

/*

state
getter
mutation 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
action
module

*/
