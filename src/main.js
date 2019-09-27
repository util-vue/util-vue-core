import Vue from "vue";
import App from "./App.vue";
import router from "./example/router/router";

// Import F7
import Framework7 from "framework7/framework7.esm.bundle.js";

// Import F7 Vue Plugin
import Framework7Vue from "framework7-vue/framework7-vue.esm.bundle.js";

// Import F7 Styles
import "framework7/css/framework7.bundle.css";

import AppCss from "./lib/css/app.css";
import Iconfont from "./lib/font/iconfont.css";

// Init F7 Vue Plugin
Framework7.use(Framework7Vue);

//图片延迟加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 4
});

import AlloyFinger from "alloyfinger";
import AlloyFingerPlugin from "alloyfinger/vue/alloy_finger_vue";
Vue.use(AlloyFingerPlugin, {
  AlloyFinger
});

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

var vue = new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

import UtilVueCore from "./lib/index";
Vue.use(UtilVueCore, {
  f7App: vue.$f7,
  serverConfig: {
    systemServer: "http://localhost:7001",
    buildingServer: "http://112.74.135.9:7002",
    commonServer: "http://112.74.135.9:7001",
    productServer: "http://112.74.135.9:7003",
    diyServer: "http://112.74.135.9:7004",
    customerServer: "http://localhost:7007"
  }
});

//vuex 装配
import store from "./lib/store";
Vue.prototype.$store = store;
