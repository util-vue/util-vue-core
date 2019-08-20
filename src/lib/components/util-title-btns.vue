<template>
  <span>
    <span @click="back()" v-if="isBack" class="util-title-btn link iconfont util-title-iconfont icon-icon_fanhui"></span>
    <template v-for="(item, index) in btns">
      <span @click="btnClick(item)" v-if="item.ic" :key="index" class="util-title-btn icon link iconfont util-title-iconfont" :class="item.ic">
        <span v-if="item.badge && item.badge > 0" class="badge color-red">{{ item.badge > 9 ? "9+" : item.badge }}
        </span>
      </span>

      <span v-else @click="btnClick(item)" :key="index" class="util-title-btn btn-text link">{{item.text}}
        <span v-if="item.badge && item.badge > 0" class="badge color-red">{{item.badge > 9 ? "9+" : item.badge}}</span>
      </span>
    </template>
  </span>
</template>

<script>
export default {
  props: {
    isBack: {
      default() {
        return false;
      }
    },
    btns: {
      default() {
        return [];
      }
    }
  },
  methods: {
    back() {
      this.$f7router.back();
    },
    btnClick(item) {
      item.click(item);
    }
  }
};
</script>

<style scoped>
.util-title-btn {
  padding: 10px;
  margin: 0;
  position: relative;
  font-size: 18px;
  width: auto;
  height: auto;
}
.util-title-iconfont {
  font-size: 20px;
}
.btn-text {
  font-size: 12px;
}
</style>
