<template>
	<div>
		<div v-for="(c,index) in content" :key="index">
			{{c}}
		</div>
	</div>
</template>

<script>
	export default {
		name: "cd",
		props: {
			content: Array,
		}
	}
</script>

<style scoped>

</style>
