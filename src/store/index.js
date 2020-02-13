import Vue from "vue";
import Vuex from "vuex";
import Cookie from 'cookie_js';
import app from './modules/app.js'
import login from './modules/login.js'
import info from './modules/info'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    login,
    info
  }
});
