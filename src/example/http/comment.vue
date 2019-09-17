<template>
  <f7-page>
    <util-nav title="菜单"></util-nav>
    <f7-page-content>
      <f7-list no-hairlines-md>
        <f7-list-input
          label="评论内容"
          type="text"
          placeholder="请输入评论内容"
          clear-button
          :value="text"
          @input="text = $event.target.value"
        ></f7-list-input>

      </f7-list>
      <f7-block>
        <f7-row>
          <f7-col>
            <f7-button
              fill
              round
              @click="sendComment"
            >发送评论</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>

      <f7-block>
        <f7-row>
          <f7-col>
            <f7-button
              fill
              round
              @click="getComment"
            >获取评论</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>

      <f7-list media-list>
        <f7-list-item
          @click="reply(item)"
          v-for="(item, index) in datas"
          :key="index"
          link="#"
          :title="item.nickname || '匿名'"
          :after="(!item.replyCount || item.replyCount===0) ? '' :  item.replyCount+'回复'"
          :text="item.content"
        >
          <img
            slot="media"
            :src="(item.avatar && item.avatar.url) || 'https://cdn.framework7.io/placeholder/people-160x160-1.jpg'"
            width="30"
          />
        </f7-list-item>
      </f7-list>
      <comment-child
        ref="child"
        :parent="selectedComment"
      ></comment-child>
    </f7-page-content>
  </f7-page>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import utilNavVue from "../util-nav/util-nav.vue";
import { QueryModel } from "./../../lib/util/common/pager";
import CommentChild from "./comment-child";
export default {
  components: { CommentChild },
  data() {
    return {
      selectedComment: undefined,
      text: "",
      datas: [],
      queryModel: new QueryModel()
    };
  },
  methods: {
    ...mapActions("customer", [
      "sendCommentAsync",
      "deleteCommentAsync",
      "rootPagerQueryAsync",
      "childQueryAsync"
    ]),
    async sendComment() {
      if (!this.text) return;
      var result = await this.sendCommentAsync({
        businessId: "7bb4ebe1-ea2e-44f4-a48a-5a123011b313",
        businessType: 1,
        content: this.text
      });
      if (!result) return;
      this.$util.message.toask("评论成功");
      //   var deleteSuccess = await this.deleteCommentAsync(result.id);
    },
    async getComment() {
      this.datas = [];
      this.queryModel.businessId = "7bb4ebe1-ea2e-44f4-a48a-5a123011b313";
      var result = await this.rootPagerQueryAsync(this.queryModel);
      if (!result) return;
      this.queryModel.extends(result);
      this.datas.push(...result.data);
    },
    reply(item) {
      var _self = this;
      if (!item.replyCount || item.replyCount == 0) {
        this.$util.message.prompt("评论", "请输入", async text => {
          var result = await this.sendCommentAsync({
            businessId: "7bb4ebe1-ea2e-44f4-a48a-5a123011b313",
            businessType: 1,
            content: text,
            parentId: item.id
          });
          _self.getComment();
        });
        return;
      }
      this.selectedComment = item;
      this.$refs.child.open();
    }
  }
};
</script>

<style>
</style>