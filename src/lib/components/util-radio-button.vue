<template>
  <div class="util-radio-button-group flex flex-content-left-center flex-wrap">
    <div
      class="util-radio-button  omit-one"
      v-for="(item, index) in datasource"
      :key="index"
      :class="{selected:selectedItem===item,disabled: disabled || item.disabled}"
      @click="click(item)"
    >
      {{item.text}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /** 数据源 */
    datasource: {
      default() {
        return [];
      }
    },
    /** 是否可以取消选中 */
    isCancel: {
      default() {
        return false;
      }
    },
    /** 禁用 */
    disabled: {
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      /** 数据源 */
      selectedItem: undefined
    };
  },
  watch: {
    datasource(val) {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (!this.datasource || this.datasource.length === 0) {
        this.$emit("click", undefined);
        return;
      }
      this.selectedItem = this.datasource[0];
      this.$emit("click", this.datasource[0]);
    },
    click(item) {
      if (this.isCancel && this.selectedItem === item) {
        this.selectedItem = undefined;
        this.$emit("click", this.selectedItem);
        return;
      }
      this.selectedItem = item;
      this.$emit("click", item);
    }
  }
};
</script>

<style scope>
.util-radio-button-group {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.util-radio-button-group .util-radio-button {
  background: #eee;
  border: 0.5px solid #eee;
  border-radius: 8px;
  font-size: 22px;
  padding: 16px 26px;
  color: #666;
  margin-right: 25px;
  margin-bottom: 30px;
  height: 32px;
}

.util-radio-button-group .util-radio-button:last-child {
  margin-right: 0;
}

.util-radio-button-group .util-radio-button.selected {
  color: white;
  background: rgba(0, 73, 91, 1);
}
</style>
