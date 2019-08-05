<template>
	<div class="version">
		<span>v{{$store.state.app.version}}</span>
	</div>
</template>

<script>
	export default {
		name: "version"
	}
</script>

<style lang="scss" scoped>
	.version{
		text-align: end;
		color: violet;
		font-size: 0.9rem;
		span{
			position: relative;
			display: inline-block;
			padding-right: 1rem;
		}
	}
</style>
