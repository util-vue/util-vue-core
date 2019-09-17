import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import article from "./article/article";
import building from "./building/building";
import common from "./common/common";
import customer from "./customer/customer";
import diyHouseType from "./diy/diyHouseType";
import diyScheme from "./diy/diyScheme";
import product from "./product/product";
import user from "./system/user";

const store = new Vuex.Store({
  modules: {
    article,
    building,
    common,
    customer,
    diyHouseType,
    diyScheme,
    product,
    user
  },
  strict: process.env.NODE_ENV !== "production"
});

export default store;
