import { util } from "./../../util/index";

const state = {
  uuidKey: "uuidKey"
};

const getters = {
  /** 获取Uuid */
  uuid(state) {
    return util.storage.getStorage(state.uuidKey);
  }
};

const mutations = {
  /** 保存Uuid */
  saveUuid(state, uuid) {
    util.storage.setStorage(state.uuidKey, uuid);
  }
};

const actions = {
  /** 用户登录 */
  async loginAsync(
    { dispatch, commit, state, rootState, rootGetters },
    params
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.customerUrl.login,
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
  /** 发送评论 */
  async sendCommentAsync(
    { dispatch, commit, state, rootState, rootGetters },
    params
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.customerUrl.sendComment,
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
  /** 删除评论 */
  async deleteCommentAsync(
    { dispatch, commit, state, rootState, rootGetters },
    id
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.customerUrl.deleteComment,
        data: JSON.stringify(id),
        success: result => {
          resolve(true);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },
  /** 评论第一层目录 */
  async rootPagerQueryAsync(
    { dispatch, commit, state, rootState, rootGetters },
    queryModel
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.customerUrl.rootPagerQuery,
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
  /** 评论子目录 */
  async childQueryAsync(
    { dispatch, commit, state, rootState, rootGetters },
    parentId
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.customerUrl.childQuery,
        data: { parentId: parentId },
        success: result => {
          resolve(result);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },

  /** 发送案例 */
  async sendCommunityAsync(
    { dispatch, commit, state, rootState, rootGetters },
    params
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.customerUrl.sendCommunity,
        data: params,
        loading: true,
        success: result => {
          resolve(result);
        },
        error: e => {
          resolve(e);
        }
      });
    });
  },
    /**获取社区、案例列表*/
    async communityPagerQueryAsync(
      { dispatch, commit, state, rootState, rootGetters },
      queryModel
    ) {
      return await new Promise((resolve, reject) => {
        util.webApi.get({
          url: util.url.customerUrl.communityPagerQuery,
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
  /** 删除社区 */
  async deleteCommunityAsync(
    { dispatch, commit, state, rootState, rootGetters },
    id
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.customerUrl.deleteCommunity,
        data: JSON.stringify(id),
        success: result => {
          resolve(true);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },
  /** 获取客户信息 */
  async getCustomerInfoAsync({ dispatch, commit, state, rootState, rootGetters }) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.customerUrl.getCustomerInfo,
        success: result => {
          resolve(result);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },   

  /**修改客户信息 */
  async saveCustomerInfoAsync(
    { dispatch, commit, state, rootState, rootGetters },
    params
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.customerUrl.saveCustomerInfo,
        data: params,
        success: result => {
          resolve(result);
        },
        error: e => {
          resolve(e);
        }
      });
    });
  },

  /** 保存Uuid */
  async saveUuidAsync({ dispatch, commit, state, rootState, rootGetters },type) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.customerUrl.getUuid,
        data: { "type": type },
        success: result => {
          commit("saveUuid", result);
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
