import { util,QueryModel } from "./../../util/index";

const state = {

};

const getters = {};

const mutations = {};

const actions = {
  /**
   * 查询文章
   * @param {*} param0 
   * @param {*} data 
   */
  async getArticleContent({ dispatch, commit, state, rootState, rootGetters },data){
    return await new Promise((resolve, reject) => {
      var where = "where IsDeleted=0 and Enabled=1";
      var order="CreationTime";
      if (data) {
        if (data.articleChannelId)
          where += " and ArticleChannelId ='"+data.articleChannelId+"'" ;
        if (data.id)
          where += " and ArticleContentId ='"+data.id+"'";
        if(data.order)
           order=data.order;
      }
      var sql = "select * from ArticleContent   " + where + "ORDER BY "+order;
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
         resolve(data);
      }, function (e) {
         resolve(e);
      });
    });
  },
    /**
   * 文章分页查询
   * @param {*} param0 
   * @param {*} data 
   */
  async getArticleContentPage({ dispatch, commit, state, rootState, rootGetters },data){
    return await new Promise((resolve, reject) => {
      var  queryModel=new QueryModel();
      var where = "where IsDeleted=0 and Enabled=1";
      var order="CreationTime DESC";
      var limit=" limit ("+(data.page-1)+")"+"*"+data.pageSize+","+data.pageSize;
      if (data) {
        if(data.articleChannelId)
            where += " and ArticleChannelId ='"+data.articleChannelId+"'" ;  
        if(data.title)  
            where += " and Title like  '%"+data.title+"%'" ;  
        if(data.keywords)
            where += " and Keywords like  '%"+data.keywords+"%'" ;  
         if(data.order)  
            order=data.order;
      }
      queryModel=data;
      var sql = "select * from ArticleContent   " + where + " ORDER BY "+order+limit;
      var totalCountSql="select COUNT(*) as totalCount from ArticleContent   " + where;
      console.log("sql="+sql+"--totalCountSql--"+totalCountSql);
      var query={};
      util.plus.sqllite.selectSql(util.url.setDb.databaseName,totalCountSql,function(data){
        query.totalCount=data[0].totalCount;
        query.pageCount=Math.ceil(query.totalCount/queryModel.pageSize);
        console.log("totalCount="+data[0].totalCount+"--pageCount--"+query.pageCount);
      })
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        console.log("data="+JSON.stringify(data));
         query.data=data;
         queryModel.extends(query);
         console.log("queryModel="+JSON.stringify(queryModel));
         resolve(queryModel);
      }, function (e) {
         resolve(e);
      });
    });
  },

      /**
       * 查询文章分类
       * @param {*} param0 
       * @param {*} data 
       */
  async getArticleChannel({ dispatch, commit, state, rootState, rootGetters }, data) 
  {
      return await new Promise((resolve, reject) => {
        var where = "where IsDeleted=0 and Enabled=1";
        if (data) {
          if (data.code)
            where += " and  Code ='"+data.code+"'";
          if (data.id)
            where += " and ArticleChannelId ='"+data.id+"'";
        }
        var sql = "select * from ArticleChannel " + where;
        util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
          resolve(data);
        }, function (e) {
          resolve(e);
        });
      });
    }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
