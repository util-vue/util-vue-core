<template>
  <f7-page :page-content="false">
    <util-nav
      title="普通菜单"
      color="#999"
      background="#fff"
      :rightBtns="btns"
    >
      <f7-link
        icon-only
        slot="right"
      >
        <f7-icon class="icon iconfont icon-icon_wodeshoucang">
          <f7-badge color="red">5</f7-badge>
        </f7-icon>
      </f7-link>
    </util-nav>
    <f7-page-content hide-navbar-on-scroll>
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