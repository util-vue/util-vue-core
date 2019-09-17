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
import { util,QueryModel} from "./../../lib/util/index";
export default {
  data() {
    return {
      queryModel: new QueryModel(),
      dataList: []
    };
  },
  methods: {
    ...mapActions("common", ["getNewDb"]),
    ...mapActions("article", [
      "getArticleContent",
      "getArticleChannel",
      "getArticleContentPage",
      "getArticleChannelPage"
    ]),
    async updateDb() {
     util.loading.show("数据同步中,请稍后...");
      var data = await this.getNewDb();
      var _self = this;
      if (data) {
        var versionNumber = util.storage.getStorage(
          "VersionNumber"
        );
        if (versionNumber < data.versionNumber) {
          util.storage.setStorage(
            "VersionNumber",
            data.versionNumber
          );
        util.plus.sqllite.updateDb(
            data.dataUpdateAddress,
            function(d) {
             util.loading.hide();
            },
            function(e) {
             util.loading.hide();
              util.message.alert("数据同步失败");
            }
          );
        } else {
        util.loading.hide();
        }
      }
    },

    init() {
      this.getArticle();
    },

    //根据Code查询分类ID
    async getArticle() {
      var data = await this.getArticleChannel({ code: "electronic_books" });
      if (!data) return;
      this.pageList(data[0].ParentId);
    },
    ///查询文章分页数据
    async pageList(parentId) {
      this.queryModel.page = 1;
      this.queryModel.pageSize = 2;
      this.queryModel.parentId = parentId;
      var result = await this.getArticleChannelPage(this.queryModel);
      this.dataList.push(result);
      console.log(JSON.stringify(this.dataList));
    }
  }
};
</script>
