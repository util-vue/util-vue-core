<template>
  <f7-nav-left v-if="isLeft">
    <f7-link
      v-if="isBack"
      class="back"
      icon="iconfont icon-icon_fanhui"
      :style="{ color:color }"
    ></f7-link>

    <f7-link
      v-for="(item, index) in btns"
      :key="index"
      icon-only
      :style="{ color:color }"
    >
      <f7-icon :class="item.ic">
        <f7-badge
          v-if="item.badge&&item.badge > 0"
          color="red"
        >{{item.badge}}</f7-badge>
      </f7-icon>
    </f7-link>
    <slot name="left"></slot>
  </f7-nav-left>
  <f7-nav-right v-else>
    <f7-link
      v-for="(item, index) in btns"
      :key="index"
      icon-only
      :style="{ color:color }"
    >
      <f7-icon :class="item.ic">
        <f7-badge
          v-if="item.badge&&item.badge > 0"
          color="red"
        >{{item.badge}}</f7-badge>
      </f7-icon>
    </f7-link>

    <slot name="right"></slot>
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
    },
    /** 颜色 */
    color: {
      default() {
        return "initial";
      }
    }
  }
};
</script>
