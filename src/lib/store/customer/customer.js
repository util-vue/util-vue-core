import { util } from "./../../util/index";

const state = {};

const getters = {};

const mutations = {};

const actions = {
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};