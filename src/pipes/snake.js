import {interval, pipe, animationFrameScheduler, Subject, BehaviorSubject, fromEvent} from "rxjs";
import {
	filter,
	map,
	pairwise,
	distinctUntilChanged,
	startWith,
	withLatestFrom,
	takeWhile
} from 'rxjs/operators'

const directions = Object.freeze({
	37: {x: -1, y: 0}, 	//left
	39: {x: 1, y: 0},		//right
	38: {x: 0, y: -1},	//up
	40: {x: 0, y: 1}		//down
});

const initialDirection = directions[`39`];
const initialPosition = {x: 12, y: 12};

export const directionSub = new BehaviorSubject(initialDirection);
export const headPositionSub = new BehaviorSubject(initialPosition);
export const snakeNodesSub = new BehaviorSubject([initialPosition]);

export const snake$ = config => headPositionSub.pipe(
	outOfBoundP(config.tableSize),
	withLatestFrom(snakeNodesSub),
	map(([pos, nodes]) => {
		nodes.unshift(pos);
		nodes.pop();
		return nodes;
	})
);

export const pause$ = obs => obs.pipe(
	filter(e => e.which === 32),
);

export const step$ = interval(100).pipe(
	withLatestFrom(headPositionSub, directionSub),
	map(([_, pos, dir]) => {
		return stepTo(pos, dir)
	})
);

export const input$ = el => fromEvent(el, 'keydown').pipe(
	dirP
);

//----------------------------------------------

export const dirP = pipe(
	map(e => directions[e.which]),
	startWith(initialDirection),
	filter(dir => !!dir),
	distinctUntilChanged(),
	pairwise(),
	filter(v => !((v[0].x === -v[1].x) || (v[0].y === -v[1].y))),
	map(v => v[1]),
);

//----------------------------------------------

export function stepTo(pos, dir) {
	return {
		x: pos.x + dir.x,
		y: pos.y + dir.y,
	}
}

const outOfBoundP = size => pipe(
	takeWhile(v => {
		return outOfBound(v, size);
	})
);

export function outOfBound(pos, tableSize) {
	return (pos.x < tableSize) && (pos.y < tableSize) && (pos.y >= 0) && (pos.x >= 0);
}

export function render(nodes) {
	document.querySelectorAll(`.snake-table-cell`).forEach(el => {
		el.classList.remove(`snake-body`);
	});
	nodes.forEach(node => {
		document.querySelector(`.snake-table-cell[data-x='${node.x}'][data-y='${node.y}']`).classList.add(`snake-body`);
	})
}
