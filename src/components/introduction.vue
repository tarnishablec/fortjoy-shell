<template>
	<div class="introduction">
		<dash-line/>
		<banner/>
		<version/>
		<dash-line/>
		<guide/>
		<dash-line/>
	</div>
</template>

<script>
	import Banner from "./banner";
	import DashLine from "./dashLine";
	import Version from "./version";
	import Guide from "./guide";

	export default {
		name: "introduction",
		components: {Guide, Version, DashLine, Banner}
	}
</script>

<style lang="scss" scoped>

</style>
