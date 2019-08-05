import router from "@/router";
import {resolveCommand} from "@/resolver/shell";

export default {
	state: {
		commandBuffer: null,
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
	actions:{
		commitCommand(context){
			console.log(context);
			resolveCommand(context.state.commandBuffer)
		}
	}
};
