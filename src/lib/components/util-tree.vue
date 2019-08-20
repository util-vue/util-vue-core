<template>
  <div class="util-tree flex flex-direction-column flex-column-stretch">
    <util-tree-item
      v-for="(item, index) in datasource"
      :key="index"
      :item="item"
      :selectedItem="selectedItem"
      @change="change"
    ></util-tree-item>
  </div>
</template>

<script>
export default {
  props: {
    datasource: {
      default() {
        return [];
      }
    },
    selectedItem: {
      default() {
        return undefined;
      }
    }
  },
  model: {
    prop: "selectedItem",
    event: "change"
  },
  data() {
    return {};
  },
  methods: {
    change(item) {
      this.$emit("change", item);
    }
  }
};
</script>

<style>
.util-tree {
}
.util-tree .util-tree-item {
  height: 69px;
  background: rgba(247, 247, 247, 1);
  border: 0.5px solid rgba(242, 242, 242, 1);
  border-radius: 8px;
  padding: 20px 28px;
  margin-bottom: 17px;
  font-size: 28px;
}

.util-tree .selected {
  font-weight: bold;
}
</style>
