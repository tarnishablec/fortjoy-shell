<template>
	<div class="shell">
		<introduction/>
	</div>
</template>

<script>
	import Introduction from "./introduction";

	export default {
		name: "shell",
		components: {Introduction}
	}
</script>

<style scoped>
	.shell {
		width: 100vw;
		max-width: 1000px;
		margin: 8px;
	}
</style>
