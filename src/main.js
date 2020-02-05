import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './icon/index'

Vue.use(ElementUI)
Vue.config.productionTip = false;




// 运行模式 runtime vue默认指向vue/dist/runtime.common.js
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
