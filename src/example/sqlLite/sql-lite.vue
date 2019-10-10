<template>
  <f7-page :page-content="false">
    <util-nav title="SqlLite数据库操作" :isBack="false"></util-nav>
    <f7-page-content>
      <f7-list accordion-list inset>
        <f7-list-item accordion-item title="SqlLite">
          <f7-accordion-content>
            <f7-list>
              <f7-list-item @click="updateDb">下载数据库</f7-list-item>
              <f7-list-item @click="init">同步资源</f7-list-item>
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
      },
      updateData:null
    };
  },
  methods: {
    ...mapActions("common", [
      "getNewDb",
      "updateAccessoryStatus",
      "getAccessoryList"
    ]),
    async updateDb() {
      util.loading.show("数据同步中,请稍后...");
      var data = await this.getNewDb();
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
    init(){
      this.tongbu();
    },
    async tongbu(){
      this.updateData= await this.getAccessoryList();
        setTimeout(() => {
      this.update();
    }, 1000);
      
    },
        /**
     * 检查资源更新
     */
    async update() {
      var self = this;
        util.loading.show("数据同步中,请稍后...");
      //同步大图
      self.updateData.forEach((item, index) => {
        if (item.Type == "jpg" || item.Type == "png") {
          var url =
            item.Url + "?imageView2/2/w/3240/h/3240";
        } else {
          var url = item.Url;
        }
         util.plus.io.loadUrlFileAndCache(url, function(d) {
          var result = self.updateAccessoryStatus({
            id: item.AttachmentId,
            status: 1
          });
        });
      });
      self.updateData.forEach((items, index) => {
        if (items.Type == "jpg" || items.Type == "png") {
          var url =
            items.Url +
            "?imageView2/2/w/500/h/500";
        util.plus.io.loadUrlFileAndCache(
            url,
            function(d) {
              if(self.updateData.length== index+1 ){
                console.log("完成");
                  util.loading.hide();
              }
            },
            null,
            null,
            "_doc/download/thum/"
          );
        }
      });
    }
  }
};
</script>
