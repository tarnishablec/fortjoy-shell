import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";
import {resolveCommand} from './resolver/shell'

Vue.use(Vuex);


export default new Vuex.Store({
	state: {
		version: '1.0.0',
		slogan: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
		role: 'guest',
		commandBuffer: 'cd /blog',
		commandLogs: [],

		introShow: true,
	},
	mutations: {
		commitCommand(state) {
			let his = {
				command: state.commandBuffer,
				role: state.role,
				path: router.app.$route.fullPath,
				result: resolveCommand(state.commandBuffer),
			};
			state.commandLogs.push(his);
			state.commandBuffer = '';
		},
		clearShell(state) {
			setTimeout(() => {
				state.introShow = false;
				state.commandLogs = [];
			}, 0);
		}
	},
	actions: {}
})
