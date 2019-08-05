<template>
	<section>
		<div class="command command-history">
			<span class="command-role">{{role}}</span>
			<span>@fortjoy.sh:</span>
			<span>{{path}}</span>
			<span>$</span>
			<span v-for="c in command">{{c===' '?'&ensp;':c}}</span>
		</div>
		<div>{{result}}</div>
		<!--		<component :is="result"/>-->
	</section>
</template>

<script>
	export default {
		name: "commandHistory",
		props: {
			role: String,
			path: String,
			command: String,
			result: String,
		}
	}
</script>

<style scoped>

</style>
