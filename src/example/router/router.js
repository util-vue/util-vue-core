import Vue from "vue";
import Router from "vue-router";
import F7App from "./../App.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: F7App
    }
  ]
});
