import router from "@/router";
import store from '@/store'
import _ from 'lodash'
import ROLE from "@/resolver/role";
import {routeEureka, pathToArray} from "@/utils/routerUtils";

export class Result {
	constructor() {

	}
}

export function resolveCommand(command) {
	return new Promise(((resolve) => {
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
	if (routeEureka(pathToArray(path), store.state.router.routes)) {
		router.push(path);
	} else {
		return `-bash: cd: ${path}: No such file or directory`
	}
}

function su(role) {
	if (ROLE.hasOwnProperty(role)) {
		store.commit('switchRole', ROLE[role])
	} else {
		return `su: user ${role} does not exist`
	}
}

function cat(filename) {
	return 'cat';
}

function ls() {

}

function pwd() {
	return router.app.$route.fullPath;
}

function ll() {

}

function clear() {
	store.commit('clear');
	return 'clear';
}

function help() {
	return `help`;
}

