import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		version: '1.0.0',
		slogan: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
		role: 'guest',
		commandBuffer: '',
		commandLog: [],
	},
	mutations: {
		commitCommand(state) {
			let his = {
				command: state.commandBuffer,
				role: state.role,
				path: '/',
				result: 1,
			};
			state.commandLog.push(his);
			state.commandBuffer = '';
		}
	},
	actions: {}
})
