import router from "@/router";
import store from '@/store'
import _ from 'lodash'

class Result {

}

export function resolveCommand(command) {
	return new Promise(((resolve, reject) => {
		let arr = _.without(command.split(' '), '');
		if (arr.length > 0) {
			resolve(eval(`${arr[0]}('${arr[1]}')`));
		}
	}))
}

function cd(path) {
	if (path.charAt(0) === '/') {
		router.push(path);
	} else {
		let nowPath = router.app.$route.fullPath;
		console.log(nowPath)
	}
}

function cat() {

}

function ls() {

}

function pwd() {

}

function ll() {

}

function clear() {
	store.commit('clearShell');
}

