<template>
    <f7-page :page-content="false">
        <util-nav title="SqlLite数据库操作" :isBack="false" ></util-nav>
        <f7-page-content>
            <f7-list accordion-list inset>
                <f7-list-item accordion-item title="SqlLite">
                    <f7-accordion-content>
                        <f7-list>
                            <f7-list-item  @click="Download">
                                下载数据库
                            </f7-list-item>
                        </f7-list>
                    </f7-accordion-content>
                </f7-list-item>
            </f7-list>
        </f7-page-content>
    </f7-page>
</template>
<script>
export default {
  data() {
    return {
      dbUrl:"http://shopfile.touchodd.com/b02d4126-c204-48b5-8a20-d8c9201fc68e.db",
    };
  },
  methods: {
    Download(){
       util.plus.SqlLite.downloadDatabase(this.dburl,function(data){
           console.log(JSON.stringify(data));
       })
    }
  }
};
</script>
