import { util } from "./../../util/index";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  /**获取社区、案例列表*/
  async buildingStylePagerQueryAsync(
    { dispatch, commit, state, rootState, rootGetters },
    queryModel
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.buildingStylePagerQuery,
        data: queryModel,
        success: result => {
          resolve(result);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },
  /** 楼盘客户分页查询 **/
  async buildingPagerQueryAsync({ commit, state }, queryModel) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.buildingPagerQuery,
        loading: false,
        data: queryModel,
        success: function(result) {
          queryModel.extends(result);
          resolve(result);
        },
        error: function() {
          queryModel.error();
          resolve(false);
        }
      });
    });
  },
  /** 楼盘客户定位位置查询 **/
  async locationQueryAsync({ commit, state }, params) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.locationQuery,
        loading: false,
        data: params,
        success: function(result) {
          resolve(result);
        },
        error: function() {
          resolve(false);
        }
      });
    });
  },
  /** 楼盘包含样板间 */
  async buildingIncludShowHouseAsync({ commit, state }, requestModel) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.buildingIncludShowHouse,
        loading: requestModel.maskLoading,
        data: {
          buildingId: requestModel.data
        },
        btn: requestModel.btn,
        success: function(result) {
          requestModel.extends();
          resolve(result);
        },
        error: function() {
          requestModel.error();
          resolve(false);
        }
      });
    });
  },
  /** 统计 */
  async platfromBuildingsMouduleStatisticsAsync({ commit, state }) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.platfromBuildingsMouduleStatistics,
        loading: false,
        success: function(result) {
          resolve(result);
        },
        error: function() {
          resolve(false);
        }
      });
    });
  },
  /** 已关注数据 */
  async attentionPagerQueryAsync({ commit, state }, queryModel) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.attentionPagerQuery,
        loading: false,
        data: queryModel,
        success: function(result) {
          queryModel.extends(result);
          resolve(result);
        },
        error: function() {
          queryModel.error();
          resolve(false);
        }
      });
    });
  },
  /** 楼盘详情 */
  async buildingDetailAsync({ commit, state }, requestModel) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.buildingDetail,
        loading: requestModel.maskLoading,
        data: {
          buildingId: requestModel.data
        },
        btn: requestModel.btn,
        success: function(result) {
          requestModel.extends();
          resolve(result);
        },
        error: function() {
          requestModel.error();
          resolve(false);
        }
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
