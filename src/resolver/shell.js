import router from "@/router";
import store from '@/store'
import _ from 'lodash'
import ROLE from "@/resolver/role";

class Result {
	constructor() {

	}
}

export function resolveCommand(command) {
	return new Promise(((resolve, reject) => {
		let arr = _.without(command.split(' '), '');
		if (arr.length > 0) {
			try {
				let res = eval(`${arr[0]}('${arr[1]}')`);
				resolve(res);
			} catch (e) {
				resolve(`-bash ${arr[0]}: command not found`)
			}
		} else {
			resolve();
		}
	}))
}

function cd(path) {

}

function su(role) {
	if (ROLE.hasOwnProperty(role)) {
		store.commit('switchRole', ROLE[role])
	}else {
		return `su: user ${role} does not exist`
	}
}

function cat() {
	return 'cat';
}

function ls() {

}

function pwd() {

}

function ll() {

}

function clear() {
	store.commit('clear');
	return 'clear';
}

function help() {
	return
}

