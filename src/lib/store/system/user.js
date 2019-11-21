import { util } from "./../../util/index";

const state = {
  token: "",
  userInfo: undefined
};

const getters = {
  /** 离线缓存的用户身份信息 */
  localToken() {
    return util.storage.getStorage("Token");
  }
};

const mutations = {
  /** 设置请求头身份认证 */
  setHeaderToken(state, token) {
    util.globalHeader.add("Authorization", `Bearer ${token}`);
  },
  /** 删除请求头身份认证 */
  removeHeaderToken(state) {
    util.globalHeader.remove("Authorization");
  },
  /** 设置登录 */
  setLogin(state, config) {
    util.storage.setStorage("Token", config.token);
    state.token = config.token;
    state.userInfo = config.userInfo;
  }
};

const actions = {
  /** 发送验证手机号登录注册一体化令牌 */
  async sendLoginOrRegisterTokenAsync(
    { dispatch, commit, state, rootState, rootGetters },
    data
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.system.sendLoginOrRegisterToken,
        data: data,
        success: result => {
          resolve(true);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },
  /** 登录 */
  async loginAsync(
    { dispatch, commit, getters, state, rootState, rootGetters },
    data
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.system.loginOrRegister,
        data: data,
        success: result => {
          resolve(result);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },
  /** 自动登录 */
  async autoLoginAsync(
    { dispatch, commit, getters, state, rootState, rootGetters },
    token
  ) {
    if (!token) token = getters.localToken;
    if (!token) return false;
    commit("setHeaderToken", token);
    return await new Promise((resolve, reject) => {
      util.webApi.get({
        url: util.url.system.get,
        success: result => {
          commit("setLogin", {
            token: token,
            userInfo: result
          });
          resolve(result);
        },
        error: () => {
          commit("removeHeaderToken");
          resolve(false);
        }
      });
    });
  },
  /**
   * 修改密码
   * @param {} param0
   * @param {*} data
   */

  async editPassWordAsync(
    { dispatch, commit, getters, state, rootState, rootGetters },
    data
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.system.editPassWord,
        data: data,
        loading: true,
        success: result => {
          resolve(true);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  },
  /**
   * 用户Id登录
   */

  async idLoginAsync(
    { dispatch, commit, getters, state, rootState, rootGetters },
    data
  ) {
    return await new Promise((resolve, reject) => {
      util.webApi.post({
        url: util.url.system.idLogin,
        data: data,
        loading: true,
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
