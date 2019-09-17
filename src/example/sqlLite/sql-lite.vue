<template>
    <f7-page :page-content="false">
        <util-nav title="SqlLite数据库操作" :isBack="false"></util-nav>
        <f7-page-content>
            <f7-list accordion-list inset>
                <f7-list-item accordion-item title="SqlLite">
                    <f7-accordion-content>
                        <f7-list>
                            <f7-list-item @click="updateDb">
                                下载数据库
                            </f7-list-item>
                            <f7-list-item @click="init">
                                查詢
                            </f7-list-item>
                        </f7-list>
                    </f7-accordion-content>
                </f7-list-item>
            </f7-list>
        </f7-page-content>
    </f7-page>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      queryModel: new UtilVueCore.QueryModel(),
      dataList: []
    };
  },
  methods: {
    ...mapActions("common", ["getNewDb"]),
    ...mapActions("article", [
      "getArticleContent",
      "getArticleChannel",
      "getArticleContentPage"
    ]),
    async updateDb() {
      UtilVueCore.util.loading.show("数据同步中,请稍后...");
      var data = await this.getNewDb();
      var _self = this;
      if (data) {
        var versionNumber = UtilVueCore.util.storage.getStorage(
          "VersionNumber"
        );
        if (versionNumber < data.versionNumber) {
          UtilVueCore.util.storage.setStorage(
            "VersionNumber",
            data.versionNumber
          );
          UtilVueCore.util.plus.sqllite.updateDb(
            data.dataUpdateAddress,
            function(d) {
              UtilVueCore.util.loading.hide();
            },
            function(e) {
              UtilVueCore.util.loading.hide();
              UtilVueCore.util.message.alert("数据同步失败");
            }
          );
        } else {
          UtilVueCore.util.loading.hide();
        }
      }
    },

    init() {
      this.getArticle();
    },

    //根据Code查询分类ID
    async getArticle() {
      var data = await this.getArticleChannel({ code: "enterprise_new" });
      console.log(JSON.stringify(data) + "--------------");
      if (!data) return;
      this.pageList(data[0].ArticleChannelId);
    },
    ///查询文章分页数据
    async pageList(articleChannelId) {
      this.queryModel.page = 1;
      this.queryModel.pageSize = 2;
      this.queryModel.articleChannelId = articleChannelId;
      var result = await this.getArticleContentPage(this.queryModel);
      console.log(JSON.stringify(result));
      this.dataList.push(result);
      console.log(JSON.stringify(this.dataList));
    }
  }
};
</script>
