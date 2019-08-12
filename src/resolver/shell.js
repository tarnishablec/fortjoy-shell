import router from "@/router";
import store from '@/store'
import _ from 'lodash'
import ROLE from "@/resolver/role";
import {routeEureka} from "@/utils/routerUtils";
import {from, interval, Observable, of} from "rxjs";
import {take} from "rxjs/operators";


function commandToArray(command) {
	return _.without(command.split(' '), '');
}

export function resolveCommand(command) {
	let res = null;
	let arr = commandToArray(command);
	if (arr.length > 0) {
		try {
			res = eval(`${arr[0]}('${arr[1]}')`);
		} catch (e) {
			if (e.name === 'ReferenceError')
				res = `${arr[0]}: command not found`;
		}
	}
	return anyToObserver(res)
}

function anyToObserver(r) {
	if (r instanceof Observable) {
		return r;
	} else {
		if (_.isArray(r)) {
			return from(r);
		}
		if (_.isString(r) || _.isNumber(r)) {
			return of(r);
		}
		return of('')
	}
}

function cd(path) {
	if (routeEureka(path, store.state.router.routes)) {
		router.push(path, () => null);
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
}

function ls() {

}

function pwd() {
	return router.app.$route.fullPath;
}

function ll() {

}

function clear() {
	store.dispatch('clear');
}

function help() {
	return ['pwd', 'cd', 'su', 'clear', 'node', 'test']
}

function node(code) {
	return eval(`eval("${code}")`)
}

function test() {
	return interval(1000).pipe(
		take(3),
	)
}

function test2() {
	return from([7, 8, 9]);
}

