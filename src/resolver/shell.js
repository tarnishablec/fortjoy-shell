import router from "@/router";
import store from '@/store'
import _ from 'lodash'
import ROLE from "@/resolver/role";
import {routeEureka, pathToArray} from "@/utils/routerUtils";

export class Result {
	constructor(type, content) {
		this.type = type;
		this.content = content;
	}
}

export async function resolveCommand(command) {
	return await new Promise(((resolve, reject) => {
		store.commit('startResolve');
		let arr = _.without(command.split(' '), '');
		if (arr.length > 0) {
			setTimeout(async () => {
				try {
					let res = new Result(arr[0], await eval(`${arr[0]}('${arr[1]}')`));
					console.log(res);
					if (res instanceof Result) {
						resolve(res)
					} else {
						reject('resolver function must return a Result type');
					}
				} catch (e) {
					if (e.name === 'ReferenceError') {
						resolve(new Result('error', [`-bash ${arr[0]}: command not found`]));
					}
				}
			}, 0)
		} else {
			resolve();
		}
	})).finally(() => {
		store.commit('endResolve');
	})
}

function cd(path) {
	if (routeEureka(path, store.state.router.routes)) {
		router.push(path, () => null);
	} else {
		return [`-bash: cd: ${path}: No such file or directory`]
	}
}

function su(role) {
	if (ROLE.hasOwnProperty(role)) {
		store.commit('switchRole', ROLE[role])
	} else {
		return [`su: user ${role} does not exist`]
	}
}

function cat(filename) {
	return ['cat'];
}

function ls() {

}

function pwd() {
	return [router.app.$route.fullPath];
}

function ll() {

}

function clear() {
	store.commit('clear');
}

function help() {
	return [`help`];
}

async function test() {
	return await new Promise((resolve => {
		setTimeout(() => {
			resolve(['done1']);
		}, 1000);
	}));
}

