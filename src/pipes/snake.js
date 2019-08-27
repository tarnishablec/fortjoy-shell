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
import _ from 'lodash'

const directions = Object.freeze({
	37: {x: -1, y: 0}, 	//left
	39: {x: 1, y: 0},		//right
	38: {x: 0, y: -1},	//up
	40: {x: 0, y: 1}		//down
});

class SnakeConfig {
	constructor(config) {
		this.tableSize = config.tableSize;
		this.element = config.element;
		this.initSpeed = config.initSpeed;
		this.initPosition = config.initPosition;
		this.initDirection = config.initDirection;
	}
}

export class SnakeGame {
	constructor(config) {
		this.config = new SnakeConfig(config);
		this.directionSub = new BehaviorSubject(config.initDirection);
		this.headPositionSub = new BehaviorSubject(config.initPosition);
		this.snakeNodesSub = new BehaviorSubject([config.initPosition]);
		this.tableArray = initTable(config.tableSize);
		this.appleSub = new BehaviorSubject(spawnApple(this.tableArray, [config.initPosition]));

		this.snake$ = this.headPositionSub.pipe(
			outOfBoundP(this.config.tableSize),
			withLatestFrom(this.snakeNodesSub, this.appleSub),
			map(([head, nodes, apple]) => {
				if (hitSelf(head, nodes)) {
					alert('You ate yourself !!!')
				}
				nodes.unshift(head);
				if (!_.isEqual(head, apple)) {
					nodes.pop();
				} else {
					this.appleSub.next(spawnApple(this.tableArray, nodes));
				}
				return nodes;
			})
		);

		this.pause$ = obs => obs.pipe(
			filter(e => e.which === 32),
		);

		this.step$ = interval(this.config.initSpeed).pipe(
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
		this.appleSub.subscribe(node => renderApple(node));
		this.snake$.subscribe(nodes => renderSnake(nodes));
	}

	terminate() {
		this.snake$.unsubscribe();
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
	takeWhile(node => {
		if (outOfBound(node, size)) {
			alert('you hit wall !!!');
			return false;
		} else {
			return true;
		}
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
	return (pos.x >= tableSize) || (pos.y >= tableSize) || (pos.y < 0) || (pos.x < 0);
}

function renderSnake(nodes) {
	document.querySelectorAll(`.table-cell`).forEach(el => {
		el.classList.remove(`snake-body`);
	});
	nodes.forEach(node => {
		document.querySelector(`.table-cell[data-x='${node.x}'][data-y='${node.y}']`).classList.add(`snake-body`);
	})
}

function renderApple(apple) {
	let pre = document.querySelector(`.apple`);
	pre ? pre.classList.remove(`apple`) : null;
	document.querySelector(`.table-cell[data-x='${apple.x}'][data-y='${apple.y}']`).classList.add(`apple`);
}

function hitSelf(head, snakeNodes) {
	return _.findIndex(_.tail(snakeNodes), n => _.isEqual(head, n)) >= 0;
}

function initTable(tableSize) {
	let res = [];
	for (let i = 0; i < tableSize; i++) {
		for (let j = 0; j < tableSize; j++) {
			res.push({
				x: j,
				y: i,
			})
		}
	}
	return res;
}

function spawnApple(tableArray, snakeNodes) {
	let temp = _.differenceWith(tableArray, snakeNodes, _.isEqual);
	return temp[_.random(0, temp.length - 1)]
}
