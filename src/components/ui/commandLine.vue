<template>
	<section class="command command-input">
		<span class="command-role">{{$store.state.permission.role.description}}</span>
		<span>@fortjoy.sh:</span>
		<span>{{$route.fullPath}}</span>
		<span>$</span>
		<span v-for="(c,index) in $store.state.command.commandBuffer+' '" :key="index"
		      :class="{'cursor':index===$store.getters.cursorPosition}">{{c===' '?'&ensp;':c}}</span>
	</section>
</template>

<script>
	import liveCursor from "./liveCursor";

	export default {
		name: "commandLine",
		components: {liveCursor},
	}
</script>

<style scoped>

</style>
