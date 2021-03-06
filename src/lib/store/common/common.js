import { util } from "./../../util/index";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  /**
   * 查询最新数据版本
   * @param {*} param0 
   * @param {请求参数} queryParam 
   */
  async getNewDb(
    { dispatch, commit, state, rootState, rootGetters },
    queryParam
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.common.getNewDb,
        data: JSON.stringify(queryParam),
        loading: true,
        success: result => {
          resolve(result);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },
    /**
   * 查询最新客户端版本
   * @param {*} param0 
   * @param {设备类型} clientCode  
   */
  async getClientVersion(
    { dispatch, commit, state, rootState, rootGetters },
    clientCode
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.common.getClientVersion,
        data:{ ClientCode: clientCode },
        success: result => {
          resolve(result);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },
  /**
   * 获取附件列表
   * @param {*} param0 
   * @param {*} data 
   */
  async getAccessoryList({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var where = "where IsDownload is null  or IsDownload=0";
      var sql = "select * from Attachment " + where;
      util.plus.sqllite.selectSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(data);
      }, function (e) {
        resolve(false); 
      });
    });
  },

  /**
   * 更改状态
   * @param {*} param0 
   * @param {*} data 
   */
  async updateAccessoryStatus({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var where = " where AttachmentId='" + data.id + "'";
      var sql ="UPDATE Attachment SET IsDownload=" + data.status+ where;
      util.plus.sqllite.executeSql(util.url.setDb.databaseName, sql, function (data) {
        resolve(true);
      }, function (e) {
        resolve(false);
      });
    });
  },
    /**
   * 添加
   * @param {*} param0 
   * @param {*} data 
   */
  async  insertAccessory({ dispatch, commit, state, rootState, rootGetters }, data) {
    return await new Promise((resolve, reject) => {
      var sql ="INSERT INTO Attachment VALUES ('" + data.AttachmentId + "','" + data.Name + "','" + data.Size + "','" + data.SizeExplain + "','" + data.Type + "','" + data.Url + "'," + data.IsDownload + ",'" + data.DownloadPath + "')";
      util.plus.sqllite.executeSql(util.url.setDb.databaseName, sql, function (data) {
        console.log("INSERT Attachment"+true);
        resolve(true);
      }, function (e) {
        resolve(false);
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
