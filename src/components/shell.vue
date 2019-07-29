<template>
	<div class="shell">
		<ghost-input/>
		<introduction/>
		<prompt/>
	</div>
</template>

<script>
	import Introduction from "./introduction";
	import Prompt from "./prompt";
	import GhostInput from "./ghostInput";

	export default {
		name: "shell",
		components: {GhostInput, Prompt, Introduction}
	}
</script>

<style scoped>
	.shell {
		width: calc(100vw - 10px);
		max-width: 850px;
		margin: 5px;
		padding: 8px;
		height: calc(100vh - 10px);
		display: flex;
		flex-direction: column;
		border: 1px solid white;
	}
</style>
