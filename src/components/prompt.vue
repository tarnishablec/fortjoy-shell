<template>
	<div class="prompt">
		<command-history v-for="(his,index) in $store.state.commandLog" :key="index" :command="his.command" :path="his.path"
		                 :role="his.role"/>
		<command-line/>
	</div>
</template>

<script>
	import CommandLine from "./commandLine";
	import CommandHistory from "./commandHistory";

	export default {
		name: "prompt",
		components: {CommandHistory, CommandLine},
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.prompt {
		min-height: 1rem;
	}
</style>
