<template>
  <f7-app
    ref="f7App"
    :params="f7params"
  >
    <f7-view
      id="main-view"
      url="/"
      main
    ></f7-view>
  </f7-app>
</template>

<script>
// Import Routes
import routes from "./router/f7-router.js";
export default {
  data() {
    return {
      // Framework7 parameters here
      f7params: {
        id: "io.framework7.testapp", // App bundle ID
        name: "Framework7", // App name
        theme: "md", // Automatic theme detection
        dialog: {
          buttonOk: "确定",
          buttonCancel: "取消",
          usernamePlaceholder: "用户名",
          passwordPlaceholder: "密码",
          preloaderTitle: "加载中...",
          progressTitle: "加载中..."
        },
        picker: {
          toolbarCloseText: "关闭"
        },
        view: {
          stackPages: true
        },
        statusbar: { enabled: false },
        // App routes
        routes: routes
      }
    };
  },
  mounted() {}
};
</script>

<style>
</style>
