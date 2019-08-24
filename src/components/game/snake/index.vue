<template>
	<div class="snake-game">
		<div class="snake-table">
			<div v-for="(row,y) in gameTable" :key="y" class="snake-table-row">
				<div v-for="(cell,x) in row" :key="x" :data-x="x" :data-y="y" class="snake-table-cell">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {interval, fromEvent} from 'rxjs'
	import {tap, take, pluck, switchMap, filter, catchError} from 'rxjs/operators'
	import _ from 'lodash'

	export default {
		name: "snakeGame",
		data() {
			return {
				tableSize: 30,
				snakeNodes: [],
				snakeHead: {x: 12, y: 12},
				direction: {x: 1, y: 0},
				food: {},
			}
		},
		computed: {
			gameTable() {
				return Array(this.tableSize).fill(Array(this.tableSize).fill(0))
			},
		},
		methods: {
			snakeMove() {

			}
		},
		mounted() {
			this.food = {
				x: _.random(0, this.tableSize - 1),
				y: _.random(0, this.tableSize - 1),
			};
			document.querySelector(`.snake-table-cell[data-x='${this.food.x}'][data-y='${this.food.y}']`).classList.add(`snake-food`);

			this.snakeNodes.push(this.snakeHead);

			fromEvent(document, 'keydown').pipe(
				pluck('which'),
				tap(w => {
					let dir = {...this.direction};
					switch (w) {
						case 38:
							dir = {x: 0, y: -1};
							break;
						case 40:
							dir = {x: 0, y: 1};
							break;
						case 37:
							dir = {x: -1, y: 0};
							break;
						case 39:
							dir = {x: 1, y: 0};
							break;
					}
					if ((dir.x !== this.direction.x) && (dir.y !== this.direction.y)) {
						this.direction = dir;
					}
				})
			).subscribe();

			interval(100).pipe(
				tap(() => {
					let temp = {...this.snakeHead};
					this.snakeHead = {
						x: temp.x + this.direction.x,
						y: temp.y + this.direction.y,
					}
				}),
				tap(() => {
					this.snakeNodes.unshift(this.snakeHead);
				}),
				tap(() => {
					if ((this.snakeHead.x === this.food.x) && (this.snakeHead.y === this.food.y)) {
						document.querySelector(`.snake-table-cell[data-x='${this.food.x}'][data-y='${this.food.y}']`).classList.remove(`snake-food`);
						this.food = {
							x: _.random(0, this.tableSize - 1),
							y: _.random(0, this.tableSize - 1),
						};
						document.querySelector(`.snake-table-cell[data-x='${this.food.x}'][data-y='${this.food.y}']`).classList.add(`snake-food`);
					} else {
						this.snakeNodes.pop();
					}
				}),
				tap(() => {
					document.querySelectorAll(`.snake-table-cell`).forEach(el => {
						el.classList.remove(`snake-body`);
					})
				}),
				tap(() => {
					this.snakeNodes.forEach(node => {
						document.querySelector(`.snake-table-cell[data-x='${node.x}'][data-y='${node.y}']`).classList.add(`snake-body`);
					})
				}),
			).subscribe({
				error: () => console.log(`lose`),
				complete: () => console.log(`end`),
			});
		}
	}
</script>

<style lang="scss" scoped>
	$cell-size: 25px;

	.snake-body {
		background: green !important;
	}

	.snake-food {
		background: purple !important;
	}

	.snake-game {
		margin: 1rem;
		display: flex;
		justify-content: center;
		overflow: hidden;

		.snake-table {
			.snake-table-row {
				height: $cell-size;
				margin: 4px 0;

				.snake-table-cell {
					margin: 2px;
					background: white;
					display: inline-flex;
					flex-wrap: nowrap;
					width: $cell-size;
					height: 100%;
					color: red;
					font-size: 0.6rem;
				}
			}
		}
	}
</style>
