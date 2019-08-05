import router from "@/router";
import store from '@/store'
import _ from 'lodash'

class Result {
	constructor() {

	}
}

export function resolveCommand(command) {
	return new Promise(((resolve, reject) => {
		let arr = _.without(command.split(' '), '');
		if (arr.length > 0) {
			let res = eval(`${arr[0]}('${arr[1]}')`);
			resolve(res);
		} else {
			resolve();
		}
	}))
}

function cd(path) {

}

function cat() {
	console.log('cat')
}

function ls() {

}

function pwd() {

}

function ll() {

}

function clear() {
	store.commit('clear');
}

