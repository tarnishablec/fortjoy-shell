<template>
	<div class="snake-game">
		<div class="snake-table">
			<div v-for="(row,y) in gameTable" :key="y" class="snake-table-row">
				<div v-for="(cell,x) in row" :key="x" :data-x="x" :data-y="y" class="snake-table-cell">
				</div>
			</div>
		</div>
		<div>
			<label>
				<input type="checkbox" v-model="state">
			</label>
			{{state}}
		</div>
	</div>
</template>

<script>
	import _ from 'lodash'
	import {headPositionSub, directionSub, input$, render, step$, snake$} from "@/pipes/snake";
	import {interval, fromEvent, combineLatest} from 'rxjs'

	export default {
		name: "snakeGame",
		data() {
			return {
				state: false,
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
			config() {
				return {
					tableSize: this.tableSize,
					element: document,
				}
			}
		},
		mounted() {
			input$(document).subscribe(directionSub);
			step$.subscribe(headPositionSub);
			snake$(this.config).subscribe({
				next: nodes => {
					render(nodes);
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	$cell-size: 25px;

	.snake-body {
		background: aquamarine !important;
	}

	.snake-food {
		background: purple !important;
	}

	.snake-game {
		margin: 1rem;
		overflow: hidden;

		* {
			box-sizing: content-box;
		}

		.snake-table {
			border: 1px solid white;
			padding: 5px;
			margin: auto;

			.snake-table-row {
				height: $cell-size;
				display: flex;
				justify-content: center;

				.snake-table-cell {
					flex-shrink: 1;
					background: wheat;
					display: inline-flex;
					flex-wrap: nowrap;
					width: $cell-size;
					height: $cell-size;
					color: red;
					font-size: 0.6rem;
				}
			}
		}
	}
</style>
