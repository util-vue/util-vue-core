import Http from "./../http/http.vue";
import Menu from "./../menu.vue";
import ActionSheet from "./../actionSheet/actionSheet.vue";
import UtilNav from "./../util-nav/util-nav.vue";
import UtilNavSearch from "./../util-nav/util-nav-search.vue";

export default [
  {
    path: "/",
    component: Menu
  },
  {
    path: "/http",
    component: Http
  },
  {
    path: "/utilNav",
    component: UtilNav
  },
  {
    path: "/utilNavSearch",
    component: UtilNavSearch
  },
  {
    path: "/actionSheet",
    component: ActionSheet
  }
];
