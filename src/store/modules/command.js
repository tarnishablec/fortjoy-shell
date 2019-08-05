import router from "@/router";
import {resolveCommand} from "@/resolver/shell";

export default {
	state: {
		introShow: true,
		commandBuffer: '',
		commandLogs: [],
	},
	mutations: {
		clear(state) {
			setTimeout(() => {
				state.introShow = false;
				state.commandLogs = [];
			}, 0);
		},
	},
	actions: {
		async commitCommand({state, rootState}) {
			let his = {
				command: state.commandBuffer,
				role: rootState.permission.role.description,
				path: router.app.$route.path
			};
			console.log(his);
			his.result = await resolveCommand(state.commandBuffer);
			state.commandLogs.push(his);
			state.commandBuffer = '';
		}
	}
};
