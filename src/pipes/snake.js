import {interval, pipe, BehaviorSubject, fromEvent} from "rxjs";
import {
	filter,
	map,
	pairwise,
	distinctUntilChanged,
	startWith,
	withLatestFrom,
	takeWhile,
} from 'rxjs/operators'

const directions = Object.freeze({
	37: {x: -1, y: 0}, 	//left
	39: {x: 1, y: 0},		//right
	38: {x: 0, y: -1},	//up
	40: {x: 0, y: 1}		//down
});

class snakeConfig {
	constructor(config) {
		this.tableSize = config.tableSize;
		this.element = config.element;
		this.initPosition = config.initPosition;
		this.initDirection = config.initDirection;
	}
}

export class SnakeGame {
	constructor(config) {
		this.config = new snakeConfig(config);
		this.directionSub = new BehaviorSubject(config.initDirection);
		this.headPositionSub = new BehaviorSubject(config.initPosition);
		this.snakeNodesSub = new BehaviorSubject([config.initPosition]);

		this.snake$ = this.headPositionSub.pipe(
			outOfBoundP(this.config.tableSize),
			withLatestFrom(this.snakeNodesSub),
			map(([pos, nodes]) => {
				nodes.unshift(pos);
				nodes.pop();
				return nodes;
			})
		);

		this.pause$ = obs => obs.pipe(
			filter(e => e.which === 32),
		);

		this.step$ = interval(100).pipe(
			withLatestFrom(this.headPositionSub, this.directionSub),
			map(([_, pos, dir]) => {
				return stepTo(pos, dir)
			})
		);

		this.input$ = fromEvent(this.config.element, 'keydown').pipe(
			dirP
		);
	}

	start() {
		this.input$.subscribe(this.directionSub);
		this.step$.subscribe(this.headPositionSub);
		this.snake$.subscribe(nodes => render(nodes));
	}

	static init(config) {
		return new SnakeGame(config);
	}
}

//----------------------------------------------

const dirP = pipe(
	map(e => directions[e.which]),
	startWith({x: 1, y: 0}),
	filter(dir => !!dir),
	distinctUntilChanged(),
	pairwise(),
	filter(v => !((v[0].x === -v[1].x) || (v[0].y === -v[1].y))),
	map(v => v[1]),
);

const outOfBoundP = size => pipe(
	takeWhile(v => {
		return outOfBound(v, size);
	})
);

//----------------------------------------------

function stepTo(pos, dir) {
	return {
		x: pos.x + dir.x,
		y: pos.y + dir.y,
	}
}

function outOfBound(pos, tableSize) {
	return (pos.x < tableSize) && (pos.y < tableSize) && (pos.y >= 0) && (pos.x >= 0);
}

function render(nodes) {
	document.querySelectorAll(`.snake-table-cell`).forEach(el => {
		el.classList.remove(`snake-body`);
	});
	nodes.forEach(node => {
		document.querySelector(`.snake-table-cell[data-x='${node.x}'][data-y='${node.y}']`).classList.add(`snake-body`);
	})
}
