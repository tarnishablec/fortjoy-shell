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

</style>
