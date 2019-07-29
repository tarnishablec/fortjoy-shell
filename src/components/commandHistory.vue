<template>
	<section class="command-history">
		<span class="command-role">{{role}}</span>
		<span>@fortjoy.sh:</span>
		<span>{{path}}</span>
		<span>$</span>
		<span>{{command}}</span>
	</section>
</template>

<script>
	export default {
		name: "commandHistory",
		props: {
			role: String,
			path: String,
			command: String,
		}
	}
</script>

<style scoped>

</style>
