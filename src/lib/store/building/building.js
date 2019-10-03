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
      }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
