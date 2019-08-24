import { util } from "./../../util/index";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  /** 获取户型 */
  async diyHouseTypePagerQueryAsync(
    { dispatch, commit, state, rootState, rootGetters },
    queryParam
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.diyUrl.diyHouseTypePagerQuery,
        data: queryParam,
        success: result => {
          resolve(result);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },
  /** 获取全景详细数据 */
  async diyPanoramaDetailAsync(
    { dispatch, commit, state, rootState, rootGetters },
    data
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.diyUrl.diyPanoramaDetail,
        data: data,
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
