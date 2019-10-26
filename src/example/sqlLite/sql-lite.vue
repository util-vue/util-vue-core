<template>
  <f7-page :page-content="false">
    <util-nav title="SqlLite数据库操作" :isBack="false"></util-nav>
    <f7-page-content>
      <f7-list accordion-list inset>
        <f7-list-item accordion-item title="SqlLite">
          <f7-accordion-content>
            <f7-list>
              <f7-list-item @click="updateDb">下载数据库</f7-list-item>
              <f7-list-item @click="init">同步资源{{present}}/{{conut}}---{{progress}}</f7-list-item>
              <f7-list-item @click="selectCatalog">商品目录</f7-list-item>
              <f7-list-item @click="select">商品目录查询商品</f7-list-item>
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
      updateData:null,
      present:0,
      conut:0,
      progress:0
    };
  },
  methods: {
    ...mapActions("common", [
      "getNewDb",
      "updateAccessoryStatus",
      "getAccessoryList","insertAccessory"
    ]),
     ...mapActions("productSqlLite", [
      "getCatalogList",
      "getCatalogGoodsListPage"
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
            async(d) =>{
              console.log("下载完成");
               await _self.addAccess(s=>{
            if(s){
               util.loading.hide();
            }
          });
             
            },
            function(e) {
              util.loading.hide();
              util.message.alert("数据同步失败");
            }
          );
      }
    },
        //添加小图资源
    async addAccess(callback) {
     util.plus.sqllite.openDb(async(d) => {
        var accessData = await this.getAccessoryList();
        for(var i=0; i<=accessData.length-1; i++){
          if (accessData[i].Type == "jpg" || accessData[i].Type == "png") {
            accessData[i].IsDownload =0;
            accessData[i].DownloadPath = "_doc/download/thum/";
            accessData[i].AttachmentId = accessData[i].AttachmentId+i;
            await this.insertAccessory(accessData[i]);
          }
          if( accessData.length == i+1 ){
              callback(true)
           }
        }
      });
    },
    init(){
           util.plus.sqllite.openDb(async(d) => {
    console.log("打開成功");
           })
       this.tongbu();
  
    },
    async tongbu(){
      this.updateData= await this.getAccessoryList();
      this.conut=this.updateData.length;
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
        var imgUrl = item.Url;
        if (item.DownloadPath) {
          imgUrl =
            item.Url +
            "?imageView2/2/w/500/h/500";
        }
        if (!item.DownloadPath) {
          if (item.Type == "jpg" || item.Type == "png")
            imgUrl =
              item.Url +
              "?imageView2/2/w/3240/h/3240";
        }
        ///缓存资源
       util.plus.io.loadUrlFileAndCache(
          imgUrl,
          async(d) => {
            var result = await self.updateAccessoryStatus({
              id: item.AttachmentId,
              status: 1
            });
               self.present +=1;
               self.progress = parseInt((self.present / self.conut) * 100);
                console.log(self.present+'-----------'+self.progress);
                if (self.conut == self.present) {
                  util.message.toast("资源缓存完成");
                  util.loading.hide();
                } 
          },null,
          e => {
             util.loading.hide();
          },
          item.DownloadPath
        );
      });
    },
   async selectCatalog(){
     util.plus.sqllite.openDb();
       var data = await this.getCatalogList({level:1});
       if(data.length>0){
        var val = await this.getCatalogList({level:2,parentId:data[0].CatalogId});
      }
      if(val.length>0){
         this.dataList= await this.getCatalogList({level:3,parentId:val[1].CatalogId});
      }
   },
   async select(){
      util.plus.sqllite.openDb();
      if(this.dataList.length<1) return;
      var arr=[];
      this.dataList.forEach(item=>{
        arr.push("'"+item.CatalogId+"'");
      })
      var val=arr.join();
      this.queryModel.catalogId =val;
      var data = await this.getCatalogGoodsListPage(this.queryModel);
    }
  
  }
};
</script>
