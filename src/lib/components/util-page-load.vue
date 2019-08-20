<template>
  <f7-page-content v-if="show" class="page-transparent">
    <div class="loader-center text-align-center">
      <f7-preloader
        color="multi"
        :size="42"
      ></f7-preloader>
      <br />
      <span class="txt-remark-lg">{{text}}</span>
    </div>
  </f7-page-content>
</template>

<script>
export default {
  props: {
    show: {
      default() {
        return false;
      }
    },
    text: {
      default() {
        return "加载中...";
      }
    }
  }
};
</script>

<style scoped>
.loader-center {
  width: 100%;
  height: auto;
  position: absolute;
  top: 33%;
}
</style>
