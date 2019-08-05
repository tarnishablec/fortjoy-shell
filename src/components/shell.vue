<template>
	<label for="ghost-input" class="shell" :class="{'focus':isFocus}">
		<input id="ghost-input" @focusin="isFocus=true" @focusout="isFocus=false"
		       v-model="$store.state.command.commandBuffer"
		       @keydown="enterCommand"/>
		<introduction v-if="$store.state.app.introShow"/>
		<prompt/>
	</label>
</template>

<script>
	import Introduction from "./ui/introduction";
	import Prompt from "./ui/prompt";

	export default {
		name: "shell",
		components: {Prompt, Introduction},
		data() {
			return {
				isFocus: false,
			}
		},
		methods: {
			enterCommand(e) {
				const shell = document.querySelector('.shell');
				if (e.which === 13) {
					this.$store.dispatch('commitCommand');
					this.$nextTick(() => {
						shell.scrollTo(0, shell.scrollHeight);
					})
				}
				if (e.which === 38) {
					this.$store.commit('lastCommand');
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "../style/mixins";

	.shell {
		max-width: 850px;
		height: 100%;
		display: flex;
		flex-direction: column;
		transition: 0.2s;
		padding: 8px;
		@include layout;

		#ghost-input {
			line-height: 0;
			position: absolute;
			top: -10rem;
		}
	}
</style>
