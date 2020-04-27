import { util } from "./../../util/index";

const state = {
  uuidKey: "uuidKey"
};

const getters = {
  /** 获取Uuid */
  uuid(state) {
    return util.storage.getStorage(state.uuidKey) || undefined;
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
        url: util.url.customer.login,
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
        url: util.url.customer.sendComment,
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
        url: util.url.customer.deleteComment,
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
        url: util.url.customer.rootPagerQuery,
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
        url: util.url.customer.childQuery,
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
        url: util.url.customer.sendCommunity,
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
        url: util.url.customer.communityPagerQuery,
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
        url: util.url.customer.deleteCommunity,
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
  async getCustomerInfoAsync({
    dispatch,
    commit,
    state,
    rootState,
    rootGetters
  }) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.customer.getCustomerInfo,
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
        url: util.url.customer.saveCustomerInfo,
        data: params,
        success: result => {
          resolve(true);
        },
        error: e => {
          resolve(false);
        }
      });
    });
  },

  /**创建意见反馈*/
  async createFeedback(
    { dispatch, commit, state, rootState, rootGetters },
    params
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.customer.feedbackCreate,
        data: params,
        loading: true,
        success: result => {
          resolve(true);
        },
        error: e => {
          resolve(false);
        }
      });
    });
  },

  /** 保存Uuid */
  async saveUuidAsync(
    { dispatch, commit, state, rootState, rootGetters },
    type
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.customer.getUuid,
        data: { type: type },
        success: result => {
          commit("saveUuid", result);
          resolve(result);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },

  /** 查询记录添加 */
	async searchRecodeAddAsync({
		commit,
		state
	}, data) {
		return await new Promise((resolve, reject) => {
			util.webApi.post({
				url: util.url.customer.searchRecodeBase,
				loading: false,
				data: data,
				errorMessage: false,
				success: function(result) {
					resolve(true)
				},
				error: function() {
					resolve(false)
				}
			});
		});
	},
	/** 获取热词 */
	async searchRecodePagerQueryAsync({
		commit,
		state
	}, queryModel) {
		return await new Promise((resolve, reject) => {
			util.webApi.get({
				url: util.url.customer.searchRecodeBase,
				loading: false,
				data: queryModel,
				errorMessage: false,
				success: function(result) {
					resolve(result)
				},
				error: function() {
					resolve(false)
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
