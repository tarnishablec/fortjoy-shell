<template>
	<section>
		<div class="command command-history">
			<span class="command-role">{{role}}</span>
			<span>@fortjoy.sh:</span>
			<span>{{path}}</span>
			<span>$</span>
			<span v-for="c in command">{{c===' '?'&ensp;':c}}</span>
		</div>
		<div>
			<div v-for="r in result" style="word-break: break-all">
				{{r}}
			</div>
		</div>
	</section>
</template>

<script>

	export default {
		name: "commandHistory",
		props: {
			role: String,
			path: String,
			command: String,
			result: Array,
		},
	}
</script>

<style lang="scss" scoped>

</style>
