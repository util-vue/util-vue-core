<template>
  <f7-nav-left v-if="isLeft">
    <f7-link
      v-if="isBack"
      class="back"
      icon="iconfont icon-icon_fanhui"
    ></f7-link>

    <f7-link
      v-for="(item, index) in btns"
      :key="index"
      :icon="item.ic"
      @click="item.click&&item.click(item)"
    ></f7-link>

  </f7-nav-left>
  <f7-nav-right v-else>
    <f7-link
      v-for="(item, index) in btns"
      :key="index"
      :icon="item.ic"
      @click="item.click&&item.click(item)"
    ></f7-link>
  </f7-nav-right>
</template>

<script>
export default {
  props: {
    /**是否左侧 */
    isLeft: {
      default() {
        return false;
      }
    },
    /** 是否存在返回按钮 */
    isBack: {
      default() {
        return true;
      }
    },
    /** 按钮 */
    btns: {
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
</style>