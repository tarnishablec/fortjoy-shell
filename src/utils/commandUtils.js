import _ from "lodash";

export function commandToArray(command) {
	return _.without(command.split(' '), '');
}
