import Vue from "vue";
import AppCss from "./css/app.css";
import Iconfont from "./font/iconfont";

import { util } from "./util/index";
import user from "./store/system/user";
import building from "./store/building/building";
import common from "./store/common/common";
import diyHouseType from "./store/diy/diyHouseType";
import product from "./store/product/product";
import { QueryModel } from "./util/common/pager";
import { Orienter } from "./util/threejs/three.orienter";

//注入组件
import UtilImage from "./components/util-image.vue";
import UtilTree from "./components/util-tree.vue";
import UtilRadioButton from "./components/util-radio-button.vue";
import UtilTreeItem from "./components/util-tree-item.vue";
import UtilTitle from "./components/util-title.vue";
import UtilTitleSpace from "./components/util-title-space.vue";
import UtilList from "./components/util-list.vue";
import UtilInputNumber from "./components/util-input-number.vue";
import UtilLayoutItem from "./components/util-layout-item.vue";
import UtilPageLoadMore from "./components/util-page-load-more.vue";
import UtilPageLoad from "./components/util-page-load.vue";

const install = (Vue, options) => {
  Vue.prototype.$util = util;
  if (!options) return;

  if (options.f7App) util.f7.initFramework7App(options.f7App);
  if (options.serverConfig) util.url.base.init(options.serverConfig);

  Vue.component("util-image", UtilImage);
  Vue.component("util-title", UtilTitle);
  Vue.component("util-radio-button", UtilRadioButton);
  Vue.component("util-tree", UtilTree);
  Vue.component("util-tree-item", UtilTreeItem);
  Vue.component("util-title-space", UtilTitleSpace);
  Vue.component("util-list", UtilList);
  Vue.component("util-input-number", UtilInputNumber);
  Vue.component("util-layout-item", UtilLayoutItem);
  Vue.component("util-page-load-more", UtilPageLoadMore);
  Vue.component("util-page-load", UtilPageLoad);
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
    product
  },
  threeJs: {
    Orienter
  }
};
