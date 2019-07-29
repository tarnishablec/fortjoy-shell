<template>
	<div id="app">
		<ghost-input/>
		<shell/>
	</div>
</template>

<script>
	import Shell from "./components/shell";
	import GhostInput from "./components/ghostInput";

	export default {
		components: {GhostInput, Shell}
	}
</script>

<style lang="scss">
	#app {
		font-family: 'Roboto Mono', serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: white;
		overflow-x: hidden;
		overflow-y: auto;
	}

	body {
		margin: 0;
		background: #1e0320;
	}
</style>
