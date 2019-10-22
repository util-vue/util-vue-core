import { util, QueryModel } from "./../../util/index";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  /**
   * 查询品牌系列
   * @param {*} param0 
   * @param {*} data 
   */
  async getBrandSerialList({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var where = "where  Enabled=1";
      var order = "SortId asc";
      if (data) {
        if (data.code)
          where += " and  Code ='" + data.code + "'";
        if (data.id)
          where += " and BrandSerialId ='" + data.id + "'";
        if (data.brandId)
          where += " and BrandId ='" + data.brandId + "'";
        if (data.order)
          order = data.order;
      }
      var sql = "select * from BrandSerial " + where + " ORDER BY " + order;
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(data);
      }, function (e) {
        resolve(e);
      });
    });
  },
  /**
  * 查询品牌系列分页
  * @param {*} param0 
  * @param {*} data 
  */
  async getBrandSerialPage({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var queryModel = new QueryModel();
      var where = "where  Enabled=1";
      var order = "SortId asc";
      var limit = " limit (" + (data.page - 1) + ")" + "*" + data.pageSize + "," + data.pageSize;
      if (data) {
        if (data.code)
          where += " and  Code ='" + data.code + "'";
        if (data.id)
          where += " and BrandSerialId ='" + data.id + "'";
        if (data.brandId)
          where += " and BrandId ='" + data.brandId + "'";
        if (data.order)
          order = data.order;
      }
      queryModel = data;
      var sql = "select * from BrandSerial " + where + " ORDER BY " + order + limit;
      var totalCountSql = "select count(*) as totalCount from BrandSerial " + where;
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, totalCountSql, function (data) {
        queryModel.totalCount = data[0].totalCount;
        queryModel.pageCount = Math.ceil(queryModel.totalCount / queryModel.pageSize);
      })
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        queryModel.extends(queryModel);
        queryModel.data = data;
        resolve(queryModel);
      }, function (e) {
        resolve(e);
      });
    });
  },

  /**
 * 查询商品
 * @param {*} param0 
 * @param {*} data 
 */
  async getGoods({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var where = "where  Enabled=1 and State=2";
      var order = "CreationTime DESC";
      if (data) {
        if (data.id)
          where += " and  GoodsId ='" + data.id + "'";
        if (data.keyword)
          where += " and  Name like  '%" + data.keyword + "%'";
        if (data.code)
          where += " and  Code ='" + data.code + "'";
        if (data.categoryId)
          where += " and  CategoryId ='" + data.categoryId + "'";
        if (data.brandSerialId)
          where += " and  BrandSerialId ='" + data.brandSerialId + "'";
        if (data.order)
          order = data.order;
      }
      var sql = "select * from Goods " + where + " ORDER BY " + order;
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(data);
      }, function (e) {
        resolve(e);
      });
    });
  },

  /**
  * 分页查询商品
  * @param {*} param0 
  * @param {*} data 
  */
  async getGoodsPage({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var queryModel = new QueryModel();
      var where = "where  Enabled=1 and State=2";
      var order = "CreationTime DESC";
      var limit = " limit (" + (data.page - 1) + ")" + "*" + data.pageSize + "," + data.pageSize;
      if (data) {
        if (data.keyword)
          where += " and a.Name like  '%" + data.keyword + "%'";
        if (data.code)
          where += " and  a.Code ='" + data.code + "'";
        if (data.categoryId)
          where += " and  a.CategoryId ='" + data.categoryId + "'";
        if (data.brandSerialId)
          where += " and  a.BrandSerialId ='" + data.brandSerialId + "'";
        if (data.tagId)
          where += " and  b.TagId ='" + data.tagId + "'";
        if (data.order)
          order = data.order;
      }
      queryModel = data;
      var sql = "select *  from (select a.*,b.*  from Goods a LEFT JOIN TagGoods b ON a.GoodsId = b.GoodsId " + where + " group by a.GoodsId  ORDER BY " + order + limit + " )  as c";
      var totalCountSql = "select count(*) as totalCount  from (select a.*,b.*  from Goods a LEFT JOIN TagGoods b ON a.GoodsId = b.GoodsId " + where + " group by a.GoodsId )  as c"
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, totalCountSql, function (data) {
        queryModel.totalCount = data[0].totalCount;
        queryModel.pageCount = Math.ceil(queryModel.totalCount / queryModel.pageSize);
      })
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        queryModel.extends(queryModel);
        queryModel.data = data;
        resolve(queryModel);
      }, function (e) {
        resolve(e);
      });
    });
  },
  /**
   * 查询产品
   * @param {*} param0 
   * @param {*} data 
   */
  async getProductList({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var where = "where  Enabled=1";
      var order = "CreationTime DESC";
      if (data) {
        if (data.code)
          where += " and  Code ='" + data.code + "'";
        if (data.id)
          where += " and ProductId ='" + data.id + "'";
        if (data.goodsId)
          where += " and GoodsId ='" + data.goodsId + "'";
        if (data.name)
          where += " and  Name like  '%" + data.name + "%'";
        if (data.order)
          order = data.order;
      }
      var sql = "select * from Product " + where + " ORDER BY " + order;
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(data);
      }, function (e) {
        resolve(e);
      });
    });
  },

    /**
   * 查询目录
   * @param {*} param0 
   * @param {*} data 
   */
  async getCatalogList({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var where = "where  Enabled=1 and Type='Vendor' ";
      var order = "SortId asc";
      if (data) {
        if (data.level)
          where += " and  Level =" + data.level + "";
        if (data.id)
          where += " and CatalogId ='" + data.id + "'";
        if(data.parentId)
          where += " and ParentId ='" + data.parentId + "'";
        if (data.name)
          where += " and  Name like  '%" + data.name + "%'";
        if (data.order)
          order = data.order;
      }
      var sql = "select * from Catalog " + where + " ORDER BY " + order;
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(data);
      }, function (e) {
        resolve(e);
      });
    });
  },



      /**
   * 查询目录商品
   * @param {*} param0 
   * @param {目录ID} id 
   */
  async getCatalogGoodsListPage({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var queryModel = new QueryModel();
      var where = "where  b.Enabled=1 and b.State=2";
      var order = "b.CreationTime DESC";
      var limit = " limit (" + (data.page - 1) + ")" + "*" + data.pageSize + "," + data.pageSize;
      if (data) {
        if (data.catalogId)
          where += " and  a.CatalogId in  (" + data.catalogId + ")";
        if (data.ids)
          where += " and  a.GoodsId in  (" + data.ids + ")";
        if (data.keyword)
          where += " and b.Name like  '%" + data.keyword + "%'";
        if (data.code)
          where += " and  b.Code ='" + data.code + "'";
        if (data.categoryId)
          where += " and  b.CategoryId ='" + data.categoryId + "'";
        if (data.tagId)
          where += " and  c.TagId ='" + data.tagId + "'";
        if (data.order)
          order = data.order;
      }
      queryModel = data;
      var sql = "select *  from (select a.*,b.*,c.* from CatalogGoods a   LEFT JOIN  Goods b  ON a.GoodsId = b.GoodsId  LEFT JOIN TagGoods c ON b.GoodsId = c.GoodsId " + where + " group by b.GoodsId  ORDER BY " + order + limit + " )  as d";
      var totalCountSql = "select count(*) as totalCount  from (select a.*,b.*,c.* from CatalogGoods a   LEFT JOIN  Goods b  ON a.GoodsId = b.GoodsId  LEFT JOIN TagGoods c ON b.GoodsId = c.GoodsId " + where + " group by b.GoodsId )  as d"
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, totalCountSql, function (data) {
        queryModel.totalCount = data[0].totalCount;
        queryModel.pageCount = Math.ceil(queryModel.totalCount / queryModel.pageSize);
      })
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        queryModel.extends(queryModel);
        queryModel.data = data;
        resolve(queryModel);
      }, function (e) {
        resolve(e);
      });
    });
  },

 









  /**
 * 查询商品Tag
 * @param {*} param0 
 * @param {*} data 
 */
  async getGoodsTagList({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var where = "where  b.Enabled=1";
      if (data) {
        if (data.goodsId)
          where += " and  a.GoodsId ='" + data.goodsId + "'";
        if (data.tagId)
          where += " and a.TagId ='" + data.tagId + "'";
      }
      var sql = "select a.*,b.* from TagGoods  a LEFT JOIN Tag b ON a.TagId = b.TagId " + where;
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(data);
      }, function (e) {
        resolve(e);
      });
    });
  },

  /**
   * 添加收藏
   * @param {*} param0 
   * @param {*} data 
   */
  async insertCollect({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var timestamp=new Date().getTime();
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
      var sql ="INSERT INTO Collect  VALUES ('" +timestamp+ "',1,'" +data.projectId+ "','" +s2+ "')";
      util.plus.sqllite.executeSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(true);
      }, function (e) {
        resolve(e);
      });
    });
  },
 /**
   * 取消收藏
   * @param {*} param0 
   * @param {*} data 
   */
  async deleteCollect({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var sql ="DELETE FROM Collect WHERE CollectId='" + data.CollectId + "'";
      util.plus.sqllite.executeSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(true);
      }, function (e) {
        resolve(e);
      });
    });
  },

  /**
  * 获取收藏商品
  * @param {*} param0 
  * @param {*} data 
  */
 async getCollectGoodsPage({ dispatch, commit, state, rootState, rootGetters }, data) {
  return await new Promise((resolve, reject) => {
    var queryModel = new QueryModel();
    var where = "where  b.Enabled=1 and b.State=2";
    var order = "b.CreationTime DESC";
    var limit = " limit (" + (data.page - 1) + ")" + "*" + data.pageSize + "," + data.pageSize;
    if (data) {
      if (data.keyword)
        where += " and b.Name like  '%" + data.keyword + "%'";
      if (data.code)
        where += " and  b.Code ='" + data.code + "'";
      if (data.categoryId)
        where += " and  b.CategoryId ='" + data.categoryId + "'";
      if (data.brandSerialId)
        where += " and  b.BrandSerialId ='" + data.brandSerialId + "'";
      if(data.collectType) 
        where += " and  a.CollectType ='" + data.collectType + "'";
      if (data.order)
        order = data.order;
    }
    queryModel = data;
    var sql = "select a.*,b.*  from Collect a LEFT JOIN  Goods b ON a.ProjectId = b.GoodsId " + where + "  ORDER BY " + order + limit;
    var totalCountSql ="select count(*) as totalCount  from Collect a LEFT JOIN  Goods b ON a.ProjectId = b.GoodsId " + where
    util.plus.sqllite.selectSql(util.url.setDb.databaseName, totalCountSql, function (data) {
      queryModel.totalCount = data[0].totalCount;
      queryModel.pageCount = Math.ceil(queryModel.totalCount / queryModel.pageSize);
    })
    util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
      queryModel.extends(queryModel);
      queryModel.data = data;
      resolve(queryModel);
    }, function (e) {
      resolve(e);
    });
  });
},

  /**
   * 查询收藏
   * @param {*} param0 
   * @param {*} data 
   */
  async getCollectList({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var where = "where  1=1";
      if (data) {
        if (data.id)
            where += " and CollectId ='" + data.id + "'";
         if (data.collectType)
            where += " and CollectType ='" + data.collectType + "'";
        if (data.projectId)
          where += " and ProjectId ='" + data.projectId + "'";
      }
      var sql = "select * from Collect " + where ;
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(data);
      }, function (e) {
        resolve(e);
      });
    });
  },



  
  /**
   * 查询商户
   * @param {*} param0 
   * @param {*} data 
   */
  async getMerchantList({ dispatch, commit, state, rootState, rootGetters }, id) {
    return await new Promise((resolve, reject) => {
      var where = "where  1=1 ";
        if (id)
            where += " and MerchantId ='" + id + "'";
      var sql = "select * from  Merchant " + where ;
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(data);
      }, function (e) {
        resolve(e);
      });
    });
  },
 



};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
