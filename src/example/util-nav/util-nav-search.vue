<template>
  <f7-page :page-content="false">
    <util-nav
      mode="2"
      title="搜索导航栏"
      background="#fff"
      :rightBtns="btns"
    ></util-nav>
    <f7-page-content>
      <h1
        v-for="(item, index) of 100"
        :key="index"
      >内容</h1>
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
        },
        {
          ic: "iconfont icon-icon_fenxiangshangpinyangbanjian",
          badge: 9
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