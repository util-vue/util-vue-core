import Http from "./../http/http.vue";
import Menu from "./../menu.vue";
import ActionSheet from "./../actionSheet/actionSheet.vue";

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
    path: "/actionSheet",
    component: ActionSheet
  }
];
