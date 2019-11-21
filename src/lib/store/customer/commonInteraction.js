import {
	util
} from "./../../util/index";

const state = {}

// getters
const getters = {

}
const setters = {

}
// actions
const actions = {
	/** 互动添加 BusinessId BusinessType Type */
	async interactionAddAsync({
		commit,
		state
	}, data) {
		return await new Promise((resolve, reject) => {
			util.webApi.post({
				url: util.url.customer.interactionAdd,
				loading: true,
				data: data,
				success: function(result) {
					resolve(true)
				},
				error: function() {
					resolve(false)
				}
			});
		});
	},
	/** 互动删除 */
	async interactionDeleteAsync({
		commit,
		state
	}, data) {
		return await new Promise((resolve, reject) => {
			util.webApi.post({
				url: util.url.customer.interactionDelete,
				loading: true,
				data: data,
				success: function(result) {
					resolve(true)
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
