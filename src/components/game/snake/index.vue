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
	import {SnakeGame} from "@/pipes/snake";

	export default {
		name: "snakeGame",
		data() {
			return {
				tableSize: 30,
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
					initPosition: {x: 12, y: 12},
					initDirection: {x: 1, y: 0},
				}
			}
		},
		mounted() {
			const snake = SnakeGame.init(this.config);
			snake.start();
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
