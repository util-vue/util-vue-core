import Vue from "vue";
import "./plus-core/common";
import AppCss from "./css/app.css";
import Iconfont from "./font/iconfont";
import FontBlod from "./font/SourceHanSansSC-Blod.css";
import FontRegular from "./font/SourceHanSansSC-Regular.css";

import { util, QueryModel } from "./util/index";
import user from "./store/system/user";
import building from "./store/building/building";
import common from "./store/common/common";
import articleSqlLite from "./store/article/article-sqllite";
import diyHouseType from "./store/diy/diyHouseType";
import diyScheme from "./store/diy/diyScheme";
import product from "./store/product/product";
import productSqlLite from "./store/product/product-sqllite";
import customer from "./store/customer/customer";
import area from "./store/common/area";
import { Orienter } from "./util/threejs/three.orienter";
//注入组件
import UtilImage from "./components/util-image.vue";
import UtilTree from "./components/util-tree.vue";
import UtilRadioButton from "./components/util-radio-button.vue";
import UtilTreeItem from "./components/util-tree-item.vue";
import UtilNav from "./components/util-nav.vue";
import UtilList from "./components/util-list.vue";
import UtilInputNumber from "./components/util-input-number.vue";
import UtilLayoutItem from "./components/util-layout-item.vue";
import UtilPageLoadMore from "./components/util-page-load-more.vue";
import UtilPageLoad from "./components/util-page-load.vue";
import UtilInputArea from "./components/util-input-area.vue";
import UtilUploadMultiple from "./components/util-upload-multiple.vue";
import UtilSingleUpload from "./components/util-upload.vue";
const install = (Vue, options) => {
  Vue.prototype.$util = util;
  if (!options) return;

  if (options.f7App) util.f7.initFramework7App(options.f7App);
  if (options.serverConfig) util.url.base.init(options.serverConfig);

  Vue.component("util-image", UtilImage);
  Vue.component("util-nav", UtilNav);
  Vue.component("util-radio-button", UtilRadioButton);
  Vue.component("util-tree", UtilTree);
  Vue.component("util-tree-item", UtilTreeItem);
  Vue.component("util-list", UtilList);
  Vue.component("util-input-number", UtilInputNumber);
  Vue.component("util-layout-item", UtilLayoutItem);
  Vue.component("util-page-load-more", UtilPageLoadMore);
  Vue.component("util-page-load", UtilPageLoad);
  Vue.component("util-input-area", UtilInputArea);
  Vue.component("util-upload-multiple", UtilUploadMultiple);
  Vue.component("util-single-upload", UtilSingleUpload);
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(install);
}

export default {
  install,
  util,
  QueryModel,
  store: {
    user,
    building,
    common,
    diyHouseType,
    product,
    diyScheme,
    articleSqlLite,
    customer,
    productSqlLite,
    area
  },
  threeJs: {
    Orienter
  }
};
