<template>
	<label for="ghost-input" class="shell" :class="{'focus':isFocus}" ref="shell">
		<input id="ghost-input" @focusin="isFocus=true" @focusout="isFocus=false"
		       :value="$store.state.command.commandBuffer"
		       @input="updateInput" @keydown="enterCommand" autofocus ref="input"/>
		<!--		@keyup="updateCaret"-->
		<introduction v-if="$store.state.command.introShow"/>
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
		// mounted() {
		// 	const input = document.querySelector('#ghost-input');
		// 	console.log(input.attributes);
		// 	const caretObserver = new MutationObserver(mutations => {
		// 		mutations.forEach(m => {
		// 			console.log(m);
		//
		// 		})
		// 	});
		// 	caretObserver.observe(input, {
		// 		attributes: true,
		// 		attributeFilter: ['caret'],
		// 	})
		// },
		methods: {
			updateInput(e) {
				this.$store.state.command.commandBuffer = e.target.value;
				this.$store.state.command.selectionStart = e.target.selectionStart;
			},
			enterCommand(e) {
				const input = this.$refs.input;
				setTimeout(() => {
					this.$store.commit('updateCaret', input.selectionStart);
				}, 0);
				const shell = this.$refs.shell;
				// console.log(e.which);
				if (e.which === 13) {
					this.$store.dispatch('commitCommand').then(() => {
						this.$nextTick(() => {
							shell.scrollTo(0, shell.scrollHeight);
						})
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
	@import "../style/variables";

	.shell {
		flex-shrink: 0;
		width: $mid-width;
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

	@media screen and (max-width: $mid-width) {
		.shell {
			width: 100%;
		}
	}
</style>
