<template>
	<label for="ghost-input" class="shell" :class="{'focus':isFocus}">
		<input id="ghost-input" @focusin="isFocus=true" @focusout="isFocus=false" v-model="$store.state.commandBuffer"
		       @keydown="enterCommand"/>
		<introduction/>
		<prompt/>
	</label>
</template>

<script>
	import Introduction from "./introduction";
	import Prompt from "./prompt";

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
					this.$store.commit('commitCommand');
					this.$nextTick(() => {
						shell.scrollTo(0, shell.scrollHeight);
					})
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.shell {
		width: calc(100vw - 10px);
		max-width: 850px;
		margin: 5px;
		padding: 8px;
		height: calc(100vh - 10px);
		display: flex;
		flex-direction: column;
		border: 1px solid white;
		overflow-y: auto;
		overflow-x: hidden;
		transition: 0.2s;

		&.focus {
			box-shadow: 0 0 2px 2px white;
		}

		#ghost-input {
			line-height: 0;
			position: absolute;
			top: -10rem;
		}
	}
</style>
