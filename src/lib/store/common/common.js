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
        url: util.url.commonUrl.getNewDb,
        data: JSON.stringify(queryParam),
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
