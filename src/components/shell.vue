<template>
	<div class="shell">
		<introduction/>
		<prompt/>
	</div>
</template>

<script>
	import Introduction from "./introduction";
	import Prompt from "./prompt";

	export default {
		name: "shell",
		components: {Prompt, Introduction}
	}
</script>

<style scoped>
	.shell {
		width: 100vw;
		max-width: 850px;
		margin: 8px;
		display: flex;
		flex-direction: column;
	}
</style>
