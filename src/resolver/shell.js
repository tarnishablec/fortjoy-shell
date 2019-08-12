import router from "@/router";
import store from '@/store'
import _ from 'lodash'
import ROLE from "@/resolver/role";
import {routeEureka, pathToArray} from "@/utils/routerUtils";
import {from, interval, of} from "rxjs";
import {take, tap} from "rxjs/operators";

export class Result {
	constructor(type, content) {
		this.type = type;
		this.content = content;
	}
}

function commandToArray(command) {
	return _.without(command.split(' '), '');
}

export function resolveCommand(command) {
	console.log(command);
	let arr = commandToArray(command);
	if (arr.length > 0) {
		try {
			return eval(`${arr[0]}('${arr[1]}')`);
		} catch (e) {
			return of(`command not found`);
		}
	}
}

function cd(path) {

}

function su(role) {

}

function cat(filename) {
}

function ls() {

}

function pwd() {
}

function ll() {

}

function clear() {
}

function help() {
}

function test() {
	return interval(1000).pipe(
		take(3),
	)
}

function test2() {
	return from([7, 8, 9]);
}

