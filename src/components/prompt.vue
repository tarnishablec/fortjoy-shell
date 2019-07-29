<template>
	<div class="prompt">
		<command-line/>
	</div>
</template>

<script>
	import CommandLine from "./commandLine";
	export default {
		name: "prompt",
		components: {CommandLine},
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
