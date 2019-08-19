import {filter, tap, share, observeOn, groupBy, mergeMap} from "rxjs/operators";
import {resolveCommand} from "@/resolver/shell";
import {pipe, Observable, animationFrameScheduler, asapScheduler, asyncScheduler, queueScheduler} from "rxjs";
import store from "@/store";

const inputP = pipe(
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
	inputP,
	groupBy(e => e.which),
	mergeMap(group => {
		switch (group.key) {
			case 13:
				return group.pipe(commitP);
			case 38:
				return group.pipe(preP);
			case 40:
				return group.pipe(nextP);
			case 9:
				return group.pipe(autoCompleteP);
			default:
				return new Observable();
		}
	}),
);
