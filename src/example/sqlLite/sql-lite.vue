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
    ...mapActions("productSqlLite", ["getBrandSerialList","getGoodsPage","getGoodsTagList"]),
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
      this.getGoodsPage();
    },

    //根据Code查询分类ID
    async getGoodsPage() {
      var data = await this.getGoodsTagList({goodsId:"4f074818-d2b1-4667-91cc-907c1f42de83"});
      console.log(JSON.stringify(data));
    },
    ///查询文章分页数据
    async pageList() {
      console.log("11122");
      var _self=this;
      this.queryModel.page = 1;
      this.queryModel.pageSize = 15;
      //this.queryModel.brandSerialId = "7ee8e755-73b8-4fa0-87a2-1f79dd3b456b";
     // this.queryModel.tagId = "41a324be-43ff-421e-92eb-a14fa63ec321";
      var result = await this.getGoodsPage(this.queryModel);
      console.log(JSON.stringify(result));
       result.data.forEach(item => {
           item.tag=_self.getGoodsTagList({goodsId:item.GoodsId});
          _self.dataList.push(item);
       });
       console.log(JSON.stringify(this.dataList));
    }
  }
};
</script>
