<template>
	<label for="ghost-input" class="shell">
		<introduction/>
		<prompt/>
		<input id="ghost-input" v-model="$store.state.commandBuffer"/>
	</label>
</template>

<script>
	import Introduction from "./introduction";
	import Prompt from "./prompt";

	export default {
		name: "shell",
		components: {Prompt, Introduction}
	}
</script>

<style lang="scss" scoped>
	.shell {
		width: calc(100vw - 10px);
		max-width: 850px;
		margin: 5px;
		padding: 8px;
		height: calc(100vh - 10px);
		display: flex;
		flex-direction: column;
		border: 1px solid white;

		#ghost-input {
			line-height: 0;
			position: absolute;
			top: -10rem;
		}
	}
</style>
