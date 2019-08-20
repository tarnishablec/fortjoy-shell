import router from "@/router"
import _ from 'lodash'
import {commandToArray} from "@/utils/commandUtils"
import {normalizePath, routeEureka} from "@/utils/routerUtils";

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
		updateResult({state}, content) {
			state.resultBuffer.push(content);
		},
		autoComplete({state, getters}) {
			if (getters.commandArray.length === 0) {
				return;
			}
			let last = (getters.commandArray.length > 1) ? _.last(getters.commandArray) : '';
			let tail = _.last(last.split('/'));
			let reg1 = new RegExp(`${tail}$`);
			let head = last.replace(reg1, '').replace(/\/$/, '');
			let reg2 = new RegExp(`^${tail}`);
			let prePath = normalizePath(head);
			let routes = routeEureka(prePath, router.options.routes).children;
			for (let i = 0; i < routes.length; i++) {
				if (routes[i].path.match(reg2)) {
					if (routes[i].path !== tail)
						state.commandBuffer += (routes[i].path.replace(tail, ''));
					return null;
				}
			}
		},
		backToGhost({state, commit}) {
			commit('switchCare', 'ghost');
		},
		clear({state}) {
			setTimeout(() => {
				state.introShow = false;
				state.commandLogs.splice(0, state.commandLogs.length);
			}, 0)
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
		pushHistory({state, commit}) {
			let his = Object.assign(state.resolveBuffer, {result: [...state.resultBuffer]});
			state.commandLogs.push(his);
			state.commandBuffer = '';
			state.resultBuffer.splice(0, state.resultBuffer.length);
			commit('resetCaret');
		},
		updateCommandOffset({state, getters, commit}, offset) {
			function moveOffset(){
				if ((state.commandOffset < 0 && state.commandOffset > -state.commandLogs.length) || (state.commandOffset === 0 && offset < 0) || (state.commandOffset === -state.commandLogs.length && offset > 0)) {
					state.commandOffset += offset;
					if (getters.commandChoose >= 0 && getters.commandChoose < state.commandLogs.length) {
						state.commandBuffer = state.commandLogs[getters.commandChoose].command;
						if (!state.commandBuffer){
							moveOffset()
						}
					} else {
						state.commandBuffer = '';
					}
				}
			}
			moveOffset();
			setTimeout(() => {
				commit('updateCaret', state.commandBuffer.length);
				document.querySelector('input#ghost-input').setSelectionRange(state.commandBuffer.length, state.commandBuffer.length);
			}, 0)
		},
	},
	getters: {
		commandArray: state => commandToArray(state.commandBuffer),
		commandChoose: state => state.commandLogs.length + state.commandOffset,
	}
};
