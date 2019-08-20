<template>
  <div class="flex util-input-number">
    <div
      class="left flex flex-content-center-center"
      @click="accSub"
    >
      <span class="iconfont icon-icon_jianhao"></span>
    </div>
    <div class="center flex flex-content-center-center">
      {{value}}
    </div>
    <div
      class="right flex flex-content-center-center"
      @click="accAdd"
    >
      <span class="iconfont icon-icon_jiahao"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default() {
        return 1;
      }
    },
    min: {
      default() {
        return undefined;
      }
    },
    max: {
      default() {
        return undefined;
      }
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    accAdd() {
      var result = this.$util.helper.accAdd(this.value, 1);
      result = this.$util.helper.clamp(result, this.min, this.max);
      this.$emit("change", result);
    },
    accSub() {
      var result = this.$util.helper.accSub(this.value, 1);
      result = this.$util.helper.clamp(result, this.min, this.max);
      this.$emit("change", result);
    }
  }
};
</script>

<style scope>
.util-input-number {
  width: 100%;
  height: 70px;
}

.util-input-number .left {
    width: 90px;
    height: 100%;
    background: #f5f5f5;
    border: 0.5px solid #ababab;
    font-size: 50px;
  }
  .util-input-number .center {
    flex: 1;
    height: 100%;
    background: white;
    border-top: 0.5px solid #ababab;
    border-bottom: 0.5px solid #ababab;
  }
  .util-input-number .right {
    height: 100%;
    width: 90px;
    background: #f5f5f5;
    border: 0.5px solid #ababab;
    font-size: 50px;
  }
</style>
