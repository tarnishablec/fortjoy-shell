<template>
	<section class="command command-input">
		<span class="command-role">{{$store.state.permission.role.description}}</span>
		<span>@fortjoy.sh:</span>
		<span>{{$route.fullPath}}</span>
		<span>$</span>
		<span v-for="(c,index) in $store.state.command.commandBuffer+' '" :key="index"
		      :class="{'caret':index===$store.state.command.caretPosition}">{{c===' '?'&ensp;':c}}
		</span>
	</section>
</template>

<script>
	export default {
		name: "commandLine",
	}
</script>

<style scoped>

</style>
