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

<style lang="scss">

</style>
