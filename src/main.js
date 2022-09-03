import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/iconfont/iconfont.css';
//svg图标的设置
import '@/assets/icons'
import svgIcon from '@/components/Svg.vue'
import jsCookie from 'js-cookie'
Vue.prototype.$cookie = jsCookie; // 在页面里可直接用 this.$cookie 调用
Vue.component('svg-icon', svgIcon)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')