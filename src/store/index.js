import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";
import {resolveCommand} from '../resolver/shell'

Vue.use(Vuex);

const modulesFiles = require.context('./modules', false, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;
	return modules
}, {});

const _store = new Vuex.Store({
	modules,
	getters,
	plugins: []
});

export default new Vuex.Store({
	state: {

		commandBuffer: 'cd /blog',
		commandLogs: [],

		introShow: true,
	},
	mutations: {
		clearShell(state) {
			setTimeout(() => {
				state.introShow = false;
				state.commandLogs = [];
			}, 0);
		},
		lastCommand(state) {
			if (state.commandLogs.length > 0) {
				state.commandBuffer = state.commandLogs[state.commandLogs.length - 1].command;
			}
		}
	},
	actions: {
		async commitCommand(context) {
			let his = {
				command: context.state.commandBuffer,
				role: context.state.role,
				path: router.app.$route.fullPath,
			};
			his['res'] = await resolveCommand(context.state.commandBuffer);
			context.state.commandLogs.push(his);
			context.state.commandBuffer = '';
		},
	}
})
