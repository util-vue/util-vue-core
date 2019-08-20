<template>
  <div
    class="flex"
    :class="{
        left:isLeft,
        right:!isLeft,
        'flex-content-left-center':isLeft, 
        'flex-content-right-center':!isLeft
    }"
  >
    <btns
      @btnClick="btnClick"
      v-if="isLeft"
      :btns="leftBtns"
      :isBack="isBack"
    ></btns>
    <btns
      @btnClick="btnClick"
      v-if="!isLeft"
      :btns="rightBtns"
      :isBack="false"
    ></btns>
    <slot
      v-if="isLeft"
      name="left"
    ></slot>
    <slot
      v-if="!isLeft"
      name="right"
    ></slot>
  </div>
</template>

<script>
import Btns from "./util-title-btns";
export default {
  components: { Btns },
  props: {
    isLeft: {
      default() {
        return true;
      }
    },
    isBack: {
      default() {
        return true;
      }
    },
    leftBtns: {
      default() {
        return [];
      }
    },
    rightBtns: {
      default() {
        return [];
      }
    }
  },
  methods: {
    btnClick(item) {
      this.$emit("btnClick", item);
    }
  }
};
</script>

<style>
</style>
