<template>
  <f7-list-item
    @click="reply(item)"
    link="#"
    :title="item.nickname || '匿名'"
    :after="(!item.replyCount || item.replyCount===0) ? '' :  item.replyCount+'回复'"
    :text="content"
  >
    <img
      slot="media"
      :src="(item.avatar && item.avatar.url) || 'https://cdn.framework7.io/placeholder/people-160x160-1.jpg'"
      width="30"
    />
  </f7-list-item>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    content() {
      var text = this.item.content;
      var parent = this.item;
      while (true) {
        parent = this.getParent(parent);
        if (parent == null) break;
        text += ` // @${parent.nickname || '匿名'}: ` + parent.content;
      }
      return text;
    }
  },
  methods: {
    reply(item) {
      this.$emit("reply", item);
    },
    getParent(item) {
      return item.parent;
    }
  }
};
</script>

<style>
</style>