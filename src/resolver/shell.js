import router from "@/router";
import store from '@/store'
import _ from 'lodash'
import ROLE from "@/resolver/role";
import {routeEureka, pathToArray} from "@/utils/routerUtils";

export class Result {
	constructor() {

	}
}

export async function resolveCommand(command) {
	return await new Promise(((resolve, reject) => {
		store.commit('disableCommit');
		let arr = _.without(command.split(' '), '');
		if (arr.length > 0) {
			try {
				resolve(eval(`${arr[0]}('${arr[1]}')`))
			} catch (e) {
				resolve(`-bash ${arr[0]}: command not found`)
			}
		} else {
			resolve();
		}
	})).finally(() => {
		store.commit('enableCommit');
	})
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

function test() {
	return new Promise((resolve => {
		setTimeout(() => {
			resolve('done1');
		}, 2000);
	}));

}

