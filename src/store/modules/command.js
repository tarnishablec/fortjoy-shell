import router from "@/router"
import store from "@/store"
import _ from 'lodash'
import {commandToArray} from "@/utils/commandUtils"
import {indexOfPath, routeEureka} from "@/utils/routerUtils";

export default {
	state: {
		introShow: true,
		commandBuffer: '',
		midCommandBuffer: '',
		resultBuffer: [],
		commandCare: 'ghost',
		resolveBuffer: {},
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
		switchCare(state, care) {
			document.querySelector(`#${care}-input`).focus();
			state.commandCare = care;
		},
	},
	actions: {
		autoComplete({state}) {
			let last = _.last(_.last(commandToArray(state.commandBuffer)).split('/'));
			let regex = `^${last}`;
			let routes = routeEureka(router.currentRoute.path, router.options.routes).children;
			routes.forEach(r => {
				if (r.path.match(regex)) {
					state.commandBuffer += (r.path.replace(`${last}`, ''));
					return null;
				}
			})
		},
		backToGhost({state, commit}) {
			commit('switchCare', 'ghost');
		},
		clear({state}) {
			setTimeout(() => {
				state.introShow = false;
				state.commandLogs.splice(0, state.commandLogs.length);
			}, 10)
		},
		startResolve({state}) {
			state.resolving = true;
		},
		endResolve({state}) {
			state.resolving = false;
		},
		storeCurrent({state, rootState}) {
			state.resolveBuffer = {
				command: state.commandBuffer,
				role: rootState.permission.role.description,
				path: router.app.$route.path,
			};
		},
		async pushHistory({state, commit}) {
			let his = Object.assign(state.resolveBuffer, {result: [...state.resultBuffer]});
			state.commandLogs.push(his);
			state.commandBuffer = '';
			state.resultBuffer.splice(0, state.resultBuffer.length);
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
				document.querySelector('input#ghost-input').setSelectionRange(state.commandBuffer.length, state.commandBuffer.length);
			}, 0)
		},
	},
	getters: {
		commandChoose: state => state.commandLogs.length + state.commandOffset,
	}
};
