<template>
	<label :for="`${$store.state.command.commandCare}-input`" @focusin="isFocus=true" @focusout="isFocus=false"
	       class="shell" :class="{'focus':isFocus}"
	       ref="shell">
		<introduction v-show="$store.state.command.introShow"/>
		<prompt/>
	</label>
</template>

<script>
	import Introduction from "./ui/layout/introduction";
	import Prompt from "./ui/layout/prompt";


	export default {
		name: "shell",
		components: {Prompt, Introduction},
		data() {
			return {
				isFocus: false,
			}
		},

	}
</script>

<style lang="scss" scoped>

</style>
