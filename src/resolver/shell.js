import router from "@/router";
import store from '@/store'
import _ from 'lodash'
import ROLE from "@/resolver/role";
import {isDirectory, normalizePath, routeEureka} from "@/utils/routerUtils";
import {from, interval, Observable, of} from "rxjs";
import {take} from "rxjs/operators";


function anyToObservable(r) {
	if (r instanceof Observable) {
		return r;
	} else {
		if (_.isArray(r) || (r instanceof Promise)) {
			return from(r);
		}
		if (_.isString(r) || _.isNumber(r)) {
			return of(r);
		}
		return of(null);
	}
}

export function resolveCommand() {
	let res = null;
	let arr = [...store.getters.commandArray];
	if (arr.length > 0) {
		let params = arr.reduce(((prev, curr, index) => {
			if (index === 0)
				return prev;
			return `${prev},'${curr}'`
		}), '');
		params = params.replace(/^,/, '');
		try {
			res = eval(`${arr[0]}(${params})`);
		} catch (e) {
			console.table(e);
			res = `${arr[0]}: command not found`;
			// if (_.indexOf(['SyntaxError', 'ReferenceError', 'TypeError'], e.name) >= 0) {
			// }
		}
	}
	return anyToObservable(res)
}

/*---------------------------------------------------*/

function cd(path) {
	let truePath = normalizePath(path);
	let tarRoute = routeEureka(truePath, router.options.routes);
	if (tarRoute) {
		if (isDirectory(tarRoute)) {
			router.push(truePath, () => null);
		} else {
			return `-bash: cd: ${path}: Not a directory`
		}
	} else {
		return `-bash: cd: ${path}: No such file or directory`
	}
}

function cat(filename) {
	let truePath = normalizePath(filename);
	let tarRoute = routeEureka(truePath, router.options.routes);
	if (tarRoute) {
		if (!isDirectory(tarRoute)) {
			document.querySelector('.viewer').focus();
			router.push(truePath, () => null);
		} else {
			return `cat: ${filename}: Is a directory`
		}
	} else {
		return `-bash: cat: ${path}: No such file or directory`
	}
}

function su(role) {
	if (ROLE.hasOwnProperty(role)) {
		return store.dispatch('switchRole', ROLE[role])
	} else {
		return `su: user ${role} does not exist`
	}
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
		let temp = r.path.replace(/^\//, '');
		res.push(isDirectory(r) ? `${temp}/` : temp)
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
	return eval(code);
}

function test() {
	return interval(1000).pipe(
		take(10),
	)
}

function test2(...a) {
	return [...a]
}

