export default {
	state: {
		commandBuffer: 'cd /blog',
		commandLogs: [],
	},
	mutations: {
		clearShell(state) {
			setTimeout(() => {
				state.introShow = false;
				state.commandLogs = [];
			}, 0);
		},
	}
};
