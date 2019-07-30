import router from "./router";
import _ from 'lodash'

export function resolveCommand(command) {
	let arr = _.without(command.split(' '), '');
	console.log(arr);
	if (arr.length === 0) {

	}
}

