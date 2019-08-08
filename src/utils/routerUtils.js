import _ from 'lodash'

export function isDirectory(route) {
	return route.children;
}

export function routeEureka(path, routes) {
	return routeFind(pathToArray(path), routes);
}

function routeFind(paths, routes) {
	let index = indexOfPath(paths.shift(), routes);
	if (index < 0) {
		return false
	} else if (paths.length !== 0) {
		return routeFind(paths, routes[index].children)
	} else {
		return true;
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
	if (arr[0] === '') {
		arr[0] = '/';
	} else {
		arr.splice(0, 0, '/')
	}
	console.log(arr);
	return arr;
}
