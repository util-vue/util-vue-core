<template>
  <f7-page :page-content="false">
    <util-nav title="SqlLite数据库操作" :isBack="false"></util-nav>
    <f7-page-content>
      <f7-list accordion-list inset>
        <f7-list-item accordion-item title="SqlLite">
          <f7-accordion-content>
            <f7-list>
              <f7-list-item @click="updateDb">下载数据库</f7-list-item>
              <f7-list-item @click="init">查詢</f7-list-item>
              <f7-list-item @click="add">新增</f7-list-item>
            </f7-list>
          </f7-accordion-content>
        </f7-list-item>
      </f7-list>
    </f7-page-content>
  </f7-page>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { util, QueryModel } from "./../../lib/util/index";
export default {
  data() {
    return {
      queryModel: new QueryModel(),
      dataList: [],
      user: {
        userName: "admin",
        password: "admin",
        uuid: "",
        device: 4,
        application: "inhome-app"
      }
    };
  },
  methods: {
    ...mapActions("common", [
      "getNewDb",
      "updateAccessoryStatus",
      "getAccessoryList"
    ]),
    ...mapActions("productSqlLite", [
      "getBrandSerialList",
      "getGoodsPage",
      "getGoodsTagList",
      "getGoods",
      "insertCollect",
      "getCollectGoodsPage"
    ]),
    ...mapActions("building", ["buildingStylePagerQueryAsync"]),
    ...mapActions("customer", ["loginAsync"]),
    async updateDb() {
      util.loading.show("数据同步中,请稍后...");
      var data = await this.getNewDb();
      console.log(JSON.stringify(data));
      var _self = this;
      if (data) {
        var versionNumber = util.storage.getStorage("VersionNumber");
      
          util.storage.setStorage("VersionNumber", data.versionNumber);
          util.plus.sqllite.updateDb(
            data.dataUpdateAddress,
            function(d) {
                     console.log("下载完成");
              util.loading.hide();
            },
            function(e) {
              util.loading.hide();
              util.message.alert("数据同步失败");
            }
          );
    
      }
    },

    init() {
      /*   var ids=["'3d6b3ce9-e926-4a3d-8f14-8a09174f6ce7'","'3d6b3ce9-e926-4a3d-8f14-8a09174f6ce7'"];
      var a=ids.join();
      console.log(JSON.stringify(a)); */
      // this.pageList();
      /*     util.plus.events.onNetChange(function(data){
        console.log("---"+data);
      }); */
      this.getGoodsPage();
    },
    add() {
      this.ins();
    },
    async ins() {
      var data = await this.insertCollect({
        projectId: "fc51d6d6-dc43-46a4-b46e-6ba376eaa398"
      });
      console.log(data);
    },
    //根据Code查询分类ID
    async getGoodsPage() {
      var d = await this.getCollectGoodsPage(this.queryModel);
      console.log(JSON.stringify(d));
      //  this.queryModel.pageSize = 1000;
      //var data = await this.buildingStylePagerQueryAsync(this.queryModel);
      //var data = await this.getGoodsTagList({goodsId:"4f074818-d2b1-4667-91cc-907c1f42de83"});
      /*   var data = await this.getGoods({id:"4f074818-d2b1-4667-91cc-907c1f42de83"});
      console.log(JSON.stringify(data)); */
      /*    var self = this;
      var updateData = await this.getAccessoryList();
      updateData.forEach((items, index) => {
        var url = items.Url + "?imageView2/2/w/300/h/300";
        util.plus.io.loadUrlFileAndCache(
          url,
          function(d) {
            var result = self.updateAccessoryStatus({
              id: items.AttachmentId,
              status: 1
            });

            console.log(JSON.stringify(d));
          },
          null,
          null,
          "_doc/download/thum/"
        );
      }); */
    },
    ///查询文章分页数据
    async pageList() {
      var _self = this;
      this.queryModel.page = 1;
      this.queryModel.pageSize = 15;
      this.queryModel.brandSerialId = "7ee8e755-73b8-4fa0-87a2-1f79dd3b456b";
      this.queryModel.tagId = "f910d3da-4718-41b5-9ef7-f2c7656e5b92";
      var result = await this.getGoodsPage(this.queryModel);
      console.log(JSON.stringify(result.data));
    }
  }
};
</script>
