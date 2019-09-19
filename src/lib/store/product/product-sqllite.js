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
      var where = "where IsDeleted=0 and Enabled=1";
      var order = "CreationTime DESC";
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
  * 分页查询商品
  * @param {*} param0 
  * @param {*} data 
  */
  async getGoodsPage({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var queryModel = new QueryModel();
      var where = "where IsDeleted=0 and Enabled=1 and State=2";
      var order = "CreationTime DESC";
      var limit = " limit (" + (data.page - 1) + ")" + "*" + data.pageSize + "," + data.pageSize;
      if (data) {
        if (data.name)
          where += " and a.Name like  '%" + data.name + "%'";
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
      var sql = "SELECT a.*, b.* FROM Goods a LEFT JOIN TagGoods b ON a.GoodsId = b.GoodsId " + where + " ORDER BY " + order + limit;
      var totalCountSql = "SELECT a.*, b.* FROM Goods a LEFT JOIN TagGoods b ON a.GoodsId = b.GoodsId " + where;
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
      var where = "where IsDeleted=0 and Enabled=1";
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

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
