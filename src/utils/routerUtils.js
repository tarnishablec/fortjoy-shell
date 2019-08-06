import _ from 'lodash'

export function isDirectory(route) {
	return route.children;
}

export function routeEureka(paths, routes) {
	let tempPaths = [...paths];
	let index = indexOfPath(tempPaths.shift(), routes);
	if (index < 0) {
		return false
	} else if (tempPaths.length !== 0) {
		return routeEureka(tempPaths, routes[index].children)
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
	let arr = _.without(path.split('/'),' ','');
	if (arr[0] === '') {
		arr[0] = '/';
	}else {
		arr.splice(0,0,'/')
	}
	console.log(arr);
	return arr;
}
