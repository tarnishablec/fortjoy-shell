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
		margin-left: 8px;
		padding: 8px;
		overflow-y: auto;
		@include layout
	}

	@media screen and (max-width: $mid-width) {
		#app {
			display: block !important;

			.viewer {
				margin: 16px 0 0 0;
			}
		}
	}
</style>
