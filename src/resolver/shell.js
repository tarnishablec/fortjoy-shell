import router from "@/router";
import store from '@/store'
import _ from 'lodash'
import ROLE from "@/resolver/role";
import {routeEureka} from "@/utils/routerUtils";
import {from, interval, Observable, of} from "rxjs";
import {take, tap} from "rxjs/operators";



function commandToArray(command) {
	return _.without(command.split(' '), '');
}

function anyToObserver(r) {
	if (r instanceof Observable) {
		return r;
	} else {
		if (_.isArray(r) || (r instanceof Promise)) {
			return from(r);
		}
		if (_.isString(r) || _.isNumber(r)) {
			return of(r);
		}
		return of('')
	}
}

export function resolveCommand(command) {
	let res = null;
	let arr = commandToArray(command);
	if (arr.length > 0) {
		try {
			res = eval(`${arr[0]}('${arr[1]}')`);
			// console.log(res)
		} catch (e) {
			console.table(e);
			res = `${arr[0]}: command not found`;
			// if (_.indexOf(['SyntaxError', 'ReferenceError', 'TypeError'], e.name) >= 0) {
			// }
		}
	}
	return anyToObserver(res)
}

/*---------------------------------------------------*/

function cd(path) {
	if (routeEureka(path, router.options.routes)) {
		router.push(path, () => null);
	} else {
		return `-bash: cd: ${path}: No such file or directory`
	}
}

function su(role) {
	if (ROLE.hasOwnProperty(role)) {
		return store.dispatch('switchRole', ROLE[role])
	} else {
		return `su: user ${role} does not exist`
	}
}

function cat(filename) {
}

function ls() {

}

function pwd() {
	return router.currentRoute.path;
}

function ll() {
	let res = [];
	let routes = routeEureka(router.currentRoute.path, router.options.routes).children;
	routes.forEach(r => {
		res.push(r.path.replace(/^\//, ''))
	});
	return res;
}

function clear() {
	return store.dispatch('clear');
}

function help() {
	return ['pwd', 'cd', 'su', 'll', 'clear', 'node', 'test']
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
	return of(null).pipe(
		tap(()=>console.log(1)),
		tap(()=>store.commit('switchCare','moon'))
	)
}

