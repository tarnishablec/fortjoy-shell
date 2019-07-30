import Vue from 'vue'
import Vuex from 'vuex'
import {resolveCommand} from './shell'

Vue.use(Vuex);


export default new Vuex.Store({
	state: {
		version: '1.0.0',
		slogan: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
		role: 'guest',
		commandBuffer: 'cd /blog',
		commandLogs: [],
	},
	mutations: {
		commitCommand(state) {
			let his = {
				command: state.commandBuffer,
				role: state.role,
				path: '/',
				result: resolveCommand(state.commandBuffer),
			};
			state.commandLogs.push(his);
			state.commandBuffer = '';
		}
	},
	actions: {
	}
})
