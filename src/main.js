import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)
//在uni-app中框架会自动调用 createApp 方法并管理应用的生命周期 会实现自动挂载app应用
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  return {
    app,
  }
}
