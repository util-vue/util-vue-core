import {
	util
} from "./../../util/index";

const state = {
	
}

// getters
const getters = {
	
}
const setters = {

}
// actions
const actions = {
	/** 查询服务器时间 */
	async getServerTimeAsync({
		commit,
		state
	}) {
		return await new Promise((resolve, reject) => {
			util.webApi.get({
				url: util.url.common.getServerTime,
				loading: false,
				success: function(result) {
					resolve(result)
				},
				error: function() {
					resolve(false)
				}
			});
		});
	}
}

// mutations
const mutations = {
	
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
