<template>
  <div class="util-item flex">
    <div class="util-lable flex flex-content-left-center">
        <span>{{lable}}：</span>
    </div>
    <div class="util-view">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lable: {
      default() {
        return "";
      }
    }
  }
};
</script>

<style >
.util-item {
  width: 100%;
}

 .util-item .util-lable {
    width: 84px;
    height: 66px;
  }

  .util-item .util-view {
    flex: 1;
    min-height: 66px;
  }
</style>
