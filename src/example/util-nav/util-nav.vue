<template>
  <f7-page :page-content="false">
    <util-nav
      title="普通菜单"
      color="#999"
      background="#fff"
      :rightBtns="btns"
    ></util-nav>
    <f7-page-content>
      内容
    </f7-page-content>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      btns: [
        {
          ic: "iconfont icon-github",
          click: this.git
        }
      ]
    };
  },
  methods: {
    git() {
      window.location.href = "https://github.com/util-vue/util-vue-core";
    }
  }
};
</script>

<style>
</style>