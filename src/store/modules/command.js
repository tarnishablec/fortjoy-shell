import router from "@/router";
import {resolveCommand} from "@/resolver/shell";

export default {
	state: {
		introShow: true,
		commandBuffer: '',
		resultBuffer: [],
		caretPosition: 0,
		commandLogs: [],
		commandOffset: 0,
		resolving: false,
	},
	mutations: {
		resetCaret(state) {
			state.caretPosition = 0;
		},
		updateCaret(state, index) {
			state.caretPosition = index;
		},
		clear(state) {
			setTimeout(() => {
				state.introShow = false;
				state.commandLogs = [];
			}, 0);
		},
	},
	actions: {
		startResolve({state}) {
			state.resolving = true;
		},
		endResolve({state}) {
			state.resolving = false;
		},
		async commitCommand({state, commit, rootState}) {
			let his = {
				command: state.commandBuffer,
				role: rootState.permission.role.description,
				path: router.app.$route.path,
				result: [...state.resultBuffer],
			};
			state.commandLogs.push(his);
			state.commandBuffer = '';
			state.resultBuffer.splice(0, 3);
			commit('resetCaret');
		},
		updateCommandOffset({state, getters, commit}, offset) {
			if ((state.commandOffset < 0 && state.commandOffset > -state.commandLogs.length) || (state.commandOffset === 0 && offset < 0) || (state.commandOffset === -state.commandLogs.length && offset > 0)) {
				state.commandOffset += offset;
				if (getters.commandChoose >= 0 && getters.commandChoose < state.commandLogs.length) {
					state.commandBuffer = state.commandLogs[getters.commandChoose].command;
				} else {
					state.commandBuffer = '';
				}
			}
			setTimeout(() => {
				commit('updateCaret', state.commandBuffer.length);
			}, 0);
		},
	},
	getters: {
		commandChoose: state => state.commandLogs.length + state.commandOffset,
	}
};
