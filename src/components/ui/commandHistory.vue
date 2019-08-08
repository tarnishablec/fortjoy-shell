<template>
	<section>
		<div class="command command-history">
			<span class="command-role">{{role}}</span>
			<span>@fortjoy.sh:</span>
			<span>{{path}}</span>
			<span>$</span>
			<span v-for="c in command">{{c===' '?'&ensp;':c}}</span>
		</div>
		<div v-if="result.content">
			<component is="test" :content="result.content"/>
		</div>
	</section>
</template>

<script>
	import {Result} from "@/resolver/shell";
	import Test from "@/components/results/test";
	import Help from "@/components/results/help";
	import Cd from "@/components/results/cd";

	export default {
		name: "commandHistory",
		components: {Cd, Help, Test},
		props: {
			role: String,
			path: String,
			command: String,
			result: Result,
		},
	}
</script>

<style scoped>

</style>
