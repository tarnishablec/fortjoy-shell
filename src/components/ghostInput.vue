<template>
	<div>
		<label for="ghost-input"></label>
		<input id="ghost-input" v-model="$store.state.commandBuffer"/>
	</div>
</template>

<script>
	export default {
		name: "ghostInput"
	}
</script>

<style scoped>
	label {
		position: fixed;
		display: block;
		width: 100%;
		height: 100%;
	}
	input{
		position: absolute;
		top: -10rem;
	}
</style>
