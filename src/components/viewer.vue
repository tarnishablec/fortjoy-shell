<template>
	<div class="viewer">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: "viewer"
	}
</script>

<style lang="scss">
	@import "../style/mixins";
	@import "../style/variables";

	.viewer {
		flex: 1;
		height: 100vh;
		margin-left: 8px;
		padding: 8px;
		@include layout
	}

	@media screen and (max-width: $small-width) {
		#app {
			display: block;

			.viewer{
				margin: 16px 0 0 0;

			}
		}
	}
</style>
