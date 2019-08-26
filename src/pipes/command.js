import {filter, tap, share, groupBy, mergeMap} from "rxjs/operators";
import {resolveCommand} from "@/resolver/shell";
import {pipe, Observable} from "rxjs";
import store from "@/store";

const shellInputP = pipe(
	filter(() => {
		return !store.state.command.resolving;
	}),
	tap(() => setTimeout(() => {
		store.commit('updateCaret', document.querySelector('#ghost-input').selectionStart);
	}, 0)),
	share(),
);

const commitP = pipe(
	tap(() => store.dispatch('startResolve')),
	tap(() => store.dispatch('storeCurrent')),
	tap(() => {
		resolveCommand().subscribe({
			next: v => store.dispatch('updateResult', v),
			error: () => null,
			complete: () => store.dispatch('endResolve').then(
				() => store.dispatch('pushHistory')
			)
		})
	}),
);
const preP = pipe(
	tap(() => store.dispatch('updateCommandOffset', -1)),
);
const nextP = pipe(
	tap(() => store.dispatch('updateCommandOffset', 1)),
);
const autoCompleteP = pipe(
	tap(e => e.preventDefault()),
	tap(() => store.dispatch('autoComplete'))
);

/*-------------------------------------------------*/

export const inputHandler = pipe(
	shellInputP,
	groupBy(e => e.which),
	mergeMap(group => {
		switch (group.key) {
			case 13: //enter
				return group.pipe(commitP);
			case 38: //up
				return group.pipe(preP);
			case 40: //down
				return group.pipe(nextP);
			case 9:	 //tab
				return group.pipe(autoCompleteP);
			default:
				return new Observable();
		}
	}),
);
