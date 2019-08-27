<template>
	<label for="sun-input" class="viewer" @focusin="isFocus=true" @focusout="isFocus=false" :class="{'focus':isFocus}">
		<input id="sun-input" class="hiding-input">
		<router-view/>
	</label>
</template>

<script>
	export default {
		name: "viewer",
		data() {
			return {
				isFocus: false,
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../style/mixins";
	@import "../style/variables";

	.viewer {
		width: 59%;
		margin-left: 1%;
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
