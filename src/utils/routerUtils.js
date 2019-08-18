import _ from 'lodash'
import router from "@/router";

export function isDirectory(route) {
	return route.hasOwnProperty('children');
}

export function cleanPath(path) {
	return path.replace(/(\?.*)$/, '');
}

export function routeEureka(path, routes) {
	return routeFind(pathToArray(normalizePath(path)), routes);
}

function routeFind(paths, routes) {
	let index = indexOfPath(paths.shift(), routes);
	if (index < 0) {
		return false
	} else if (paths.length !== 0) {
		return routeFind(paths, routes[index].children)
	} else {
		return routes[index];
	}
}

function indexOfPath(path, routes) {
	let routeArr = [];
	for (let route of routes) {
		routeArr.push(route.path);
	}
	return routeArr.indexOf(path);
}

export function pathToArray(path) {
	let arr = _.without(path.split('/'), ' ', '');
	if (path[0] === '/') {
		arr.splice(0, 0, '/');
	}
	return arr;
}

export function normalizePath(path) {
	let arr = null;
	let current = pathToArray(router.app.$route.path);
	let tar = pathToArray(path);
	if (path[0] === '/') {
		arr = convertPathArray(['/'], tar);
	} else {
		arr = convertPathArray(current, tar);
	}
	return arr.join('/').replace(/^\/\//, '/');
}

function convertPathArray(curr, tar) {
	let res = [...curr];
	let temp = [...tar];
	temp.forEach(t => {
		if (t === '..') {
			res.pop();
		} else if (t === '.') {
		} else {
			res.push(t);
		}
	});
	return res;
}
