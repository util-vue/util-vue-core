import { util } from "./../../util/index";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  /**
   * 查询文章
   * @param {*} param0 
   * @param {*} data 
   */
  async getHomeBanner({ dispatch, commit, state, rootState, rootGetters },data){
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
