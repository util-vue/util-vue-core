import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import articleSqlLite from "./article/article-sqllite";
import building from "./building/building";
import common from "./common/common";
import customer from "./customer/customer";
import commonInteraction from "./customer/commonInteraction";
import diyHouseType from "./diy/diyHouseType";
import diyScheme from "./diy/diyScheme";
import product from "./product/product";
import productSqlLite from "./product/product-sqllite";
import user from "./system/user";
import area from "./common/area";
import showhouse from "./showhouse/showhouse";

const store = new Vuex.Store({
  modules: {
    articleSqlLite,
    building,
    common,
    customer,
    commonInteraction,
    diyHouseType,
    diyScheme,
    product,
    user,
    productSqlLite,
    area,
    showhouse
  },
  strict: process.env.NODE_ENV !== "production"
});

export default store;
