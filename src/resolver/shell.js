import router from "../router";
import _ from 'lodash'

export function resolveCommand(command) {
	let arr = _.without(command.split(' '), '');
	if (arr.length > 0) {
		try {
			eval(`${arr[0]}('${arr[1]}')`)
		}catch (e) {

		}
	}
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

}

