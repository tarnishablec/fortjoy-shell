<template>
	<div id="app">
		<shell/>
	</div>
</template>

<script>
	import Shell from "./components/shell";

	export default {
		components: {Shell}
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

	*{
		box-sizing: border-box;
	}
</style>
