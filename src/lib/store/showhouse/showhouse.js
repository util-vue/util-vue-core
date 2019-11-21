import { util } from "./../../util/index";

const state = {};

// getters
const getters = {};
const setters = {};
// actions
const actions = {
  /** 样板间分页查询 */
  async showHousePagerQueryAsync({ commit, state }, queryModel) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.showHousePagerQuery,
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
  /** 样板间详情 */
  async showHouseDetailAsync({ commit, state }, requestModel) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.showHouseDetail,
        loading: false,
        data: {
          showhouseId: requestModel.data
        },
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

  /** 风格列表 */
  async styleSelectItemsAsync({ commit, state }) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.styleSelectItems,
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
  /** 价格列表 */
  async priceRangeSelectItemsAsync({ commit, state }) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.priceRangeSelectItems,
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
  /** 户型列表 */
  async housetypeSelectItemsAsync({ commit, state }) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.building.housetypeSelectItems,
        loading: false,
        success: function(result) {
          resolve(result);
        },
        error: function() {
          resolve(false);
        }
      });
    });
  }
};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
