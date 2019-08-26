import {interval, pipe, animationFrameScheduler} from "rxjs";
import {tap, scan, filter, map, pairwise, distinctUntilChanged, startWith, withLatestFrom} from 'rxjs/operators'

const directions = {
	37: {x: -1, y: 0},
	39: {x: 1, y: 0},
	38: {x: 0, y: -1},
	40: {x: 0, y: 1}
};

const initialDirection = {x: 1, y: 0};
const initialPosition = {x: 12, y: 12};

export const snake$ = obs => obs.pipe(
	startWith(initialPosition),
);

const move$ = interval(100).pipe(

);

export const direction$ = obs => obs.pipe(
	startWith(initialDirection),
	map(e => directions[e.which]),
	filter(dir => !!dir),
	distinctUntilChanged(),
	pairwise(),
	filter(v => !((v[0].x === -v[1].x) || (v[0].y === -v[1].y))),
	map(v => v[1]),
);

export const pause$ = obs => obs.pipe(
	filter(e => e.which === 32),
);
