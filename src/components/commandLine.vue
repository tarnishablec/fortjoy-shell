<template>
	<section class="command command-input">
		<span class="command-role">{{$store.state.role}}</span>
		<span>@fortjoy.sh:</span>
		<span>{{$route.fullPath}}</span>
		<span>$</span>
		<span v-for="c in $store.state.commandBuffer">{{c===' '?'&ensp;':c}}</span>
		<live-cursor/>
	</section>
</template>

<script>
	import liveCursor from "./liveCursor";

	export default {
		name: "commandLine",
		components: {liveCursor},
	}
</script>

<style lang="scss">
	.command {
		width: 100%;
		overflow-x: hidden;
		flex-wrap: wrap;
		color: #e2e2e2;
		display: flex;

		span:nth-child(1) {
			color: #ff7171;
		}

		span:nth-child(2) {
			color: #6fff9e;
		}

		span:nth-child(3) {
			color: #55d5ff;
			margin-right: 0.5rem;
		}

		span:nth-child(4) {
			color: #ffd800;
			margin-right: 0.5rem;
		}

	}
</style>
