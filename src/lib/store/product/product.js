import { util } from "./../../util/index";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  /** 获取商品清单 */
  async goodsBillAsync(
    { dispatch, commit, state, rootState, rootGetters },
    queryParam
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.productUrl.goodsBill,
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
