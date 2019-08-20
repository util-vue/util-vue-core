<template>
  <div>
    <div
      class="util-tree-item flex flex-content-between-center"
      v-if="item"
      @click="itemClick(item)"
      :class="{selected:(isSelected)}"
    >
      <span
        class="omit-one"
        :style="{'padding-left':(7 * (item.level-1))+'px'}"
      >
        {{item.name}}
      </span>

      <template v-if="item.childs">
        <span
          v-if="item.isExpand"
          class="iconfont icon-icon_xiangshangshouqijiantou"
        ></span>
        <span
          v-else
          class="iconfont icon-icon_xiangxiashouqijiantou"
        ></span>
      </template>
      <span
        v-else
        class="iconfont icon-icon_xiangyouzhankaijiantou"
      ></span>
    </div>
    <template v-if="item.childs && item.isExpand">
      <util-tree-item
        v-for="(chid, index) in item.childs"
        :key="index"
        :item="chid"
        :selectedItem="selectedItem"
        @change="change"
      ></util-tree-item>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      default() {
        return undefined;
      }
    },
    selectedItem: {
      default() {
        return undefined;
      }
    }
  },
  computed: {
    isSelected() {
      return this.item === this.selectedItem;
    }
  },
  methods: {
    itemClick(item) {
      if (item.childs && item.childs.length > 0) {
        if (item.isExpand === undefined) {
          item.isExpand = true;
          return;
        }
        item.isExpand = !item.isExpand;
        return;
      }
      this.$emit("change", item);
    },
    change(item) {
      this.$emit("change", item);
    }
  }
};
</script>

<style scope>
</style>
