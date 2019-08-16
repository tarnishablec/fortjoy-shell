<template>
	<div class="snake">

	</div>
</template>

<script>
	export default {
		name: "snake",
		data() {
			return {
				tableSize: 20,
			}
		},
		computed: {
			gameTable: {
				get() {
					return Array(this.tableSize).fill(Array(this.tableSize).fill(0))
				}
			}
		}
	}
</script>

<style scoped>

</style>
