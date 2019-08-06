import router from "@/router";
import {resolveCommand} from "@/resolver/shell";

export default {
	state: {
		introShow: true,
		commandBuffer: '',
		caretPosition: 0,
		commandLogs: [],
	},
	mutations: {
		clear(state) {
			setTimeout(() => {
				state.introShow = false;
				state.commandLogs = [];
			}, 0);
		},
		updateCaret(state, index) {
			state.caretPosition = index;
		}
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
	},
	getters: {
		cursorPosition: state => state.selectionStart,
	}
};
