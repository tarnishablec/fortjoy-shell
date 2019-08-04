<template>
	<div id="app">
		<shell/>
		<viewer/>
	</div>
</template>

<script>
	import Shell from "./components/shell";
	import Viewer from "@/components/viewer";

	export default {
		components: {Viewer, Shell}
	}
</script>

<style lang="scss">
	#app {
		font-family: 'Roboto Mono', serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: white;
		padding: 8px;
		overflow: hidden;
		display: flex;
		height: 100vh;
	}

	body {
		margin: 0;
		background: var(--background-color);
	}

</style>
