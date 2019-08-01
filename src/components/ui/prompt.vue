<template>
	<div class="prompt">
		<command-history v-for="(his,index) in $store.state.commandLogs" :key="index" :command="his.command" :path="his.path"
		                 :role="his.role" :result="his.result"/>
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
		line-height: 1.2rem;
	}
</style>
