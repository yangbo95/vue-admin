import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from '@vue/composition-api';
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './icon/index';
import './router/premission';
import global from './utils/global';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';


Vue.use(Viewer);
Viewer.setDefaults({
  Options: { 'inline': true, 'transition': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
});

Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;




// 运行模式 runtime vue默认指向vue/dist/runtime.common.js
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
