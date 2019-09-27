import Http from "./../http/http.vue";
import ImageCache from "./../http/image-cache.vue";
import PhotoSwiper from "./../images/photoswiper.vue";
import Menu from "./../menu.vue";
import ActionSheet from "./../actionSheet/actionSheet.vue";
import UtilNav from "./../util-nav/util-nav.vue";
import UtilNavSearch from "./../util-nav/util-nav-search.vue";
import sqlLite from "./../sqlLite/sql-lite.vue";
import comment from "./../http/comment.vue";
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
  },
  {
    path: "/sqlLite",
    component: sqlLite
  },
  {
    path: "/comment",
    component: comment
  },
  {
    path: "/imageCache",
    component: ImageCache
  },
  {
    path: "/photoSwiper",
    component: PhotoSwiper
  }
];
