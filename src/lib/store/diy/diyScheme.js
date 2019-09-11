import { util } from "./../../util/index";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  /** 保存方案 */
  async saveSchemeAsync(
    { dispatch, commit, state, rootState, rootGetters },
    params
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.diyUrl.saveScheme,
        data: params,
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
  /** 换装方案查询 */
  async diySchemePagerQueryAsync(
    { dispatch, commit, state, rootState, rootGetters },
    queryModel
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.diyUrl.diySchemePagerQuery,
        data: queryModel,
        success: result => {
          resolve(result);
        },
        error: () => {
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
