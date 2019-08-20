import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import user from "./system/user";

const store = new Vuex.Store({
  modules: { user },
  strict: process.env.NODE_ENV !== "production"
});

export default store;
