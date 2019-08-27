<template>
	<div class="snake-game">
		<div class="game-table">
			<div v-for="(row,y) in gameTable" :key="y" class="table-row">
				<div v-for="(cell,x) in row" :key="x" :data-x="x" :data-y="y" class="table-cell">
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
					initSpeed: 200,
					initPosition: {x: 12, y: 12},
					initDirection: {x: 1, y: 0},
				}
			}
		},
		mounted() {
			this.snake = SnakeGame.init(this.config);
			this.snake.start();
		},
		beforeDestroy() {
			this.snake.terminate();
		}
	}
</script>

<style lang="scss" scoped>
	$cell-size: 25px;

	.snake-body {
		background: aquamarine !important;
	}

	.apple {
		background: purple !important;
	}

	.snake-game {
		margin: 1rem;
		overflow: hidden;

		* {
			box-sizing: content-box;
		}

		.game-table {
			border: 1px solid white;
			padding: 5px;

			.table-row {
				height: $cell-size;
				display: flex;
				justify-content: center;

				.table-cell {
					flex-shrink: 0;
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
