<template>
  <f7-popup ref="popup">
    <f7-page>
      <util-nav title="菜单"></util-nav>
      <f7-page-content>
        <f7-list media-list>
          <comment-item v-for="(item, index) in datas" :key="index" :item="item" @reply="reply"></comment-item>
        </f7-list>
      </f7-page-content>
    </f7-page>
  </f7-popup>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { QueryModel } from "./../../lib/util/common/pager";
import CommentItem from "./comment-item";
export default {
  components: { CommentItem },
  props: ["parent"],
  data() {
    return {
      text: "",
      datas: []
    };
  },
  watch: {
    parent(val) {
      this.load();
    }
  },
  methods: {
    ...mapActions("customer", [
      "sendCommentAsync",
      "deleteCommentAsync",
      "rootPagerQueryAsync",
      "childQueryAsync"
    ]),
    open() {
      this.$refs.popup.open();
    },
    async load() {
      this.datas = await this.childQueryAsync(this.parent.id);
      debugger;
    },
    reply(item) {
      var _self = this;
      this.$util.message.prompt("评论", "请输入", async text => {
        var result = await this.sendCommentAsync({
          businessId: "7bb4ebe1-ea2e-44f4-a48a-5a123011b313",
          businessType: 1,
          content: text,
          parentId: item.id
        });
        _self.load();
      });
    }
  }
};
</script>

<style>
</style>