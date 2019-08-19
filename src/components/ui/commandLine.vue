<template>
	<div>
		<input id="ghost-input" class="hiding-input"
		       v-model="$store.state.command.commandBuffer"
		       autofocus ref="input"/>
		<input id="moon-input" class="hiding-input"
		       v-model="$store.state.command.midCommandBuffer"/>
		<section class="command command-input">
			<span class="command-role">{{$store.state.permission.role.description}}</span>
			<span>@fortjoy.sh:</span>
			<span>{{$route.path}}</span>
			<span>$</span>
			<span v-for="(c,index) in $store.state.command.commandBuffer+' '" :key="index"
			      :class="{'caret':!$store.state.command.resolving && (index===$store.state.command.caretPosition)}">
				{{c===' '?'&ensp;':c}}
		</span>
		</section>
		<div class="result">
			<div v-for="en in $store.state.command.resultBuffer">{{en}}</div>
			<fake-caret v-if="$store.state.command.resolving"/>
		</div>
	</div>
</template>

<script>
	import FakeCaret from "@/components/ui/fakeCaret";
	import {fromEvent} from 'rxjs'
	import {inputHandler} from "@/resolver/pipes";

	export default {
		name: "commandLine",
		components: {FakeCaret},
		mounted() {
			const ghostInput = document.querySelector('#ghost-input');
			fromEvent(ghostInput, 'keydown').pipe(
				inputHandler
			).subscribe();

// ----------------------------------
			const shell = document.querySelector('.shell');
			const prompt = document.querySelector('.prompt');
			const promptObs = new MutationObserver(mutations => {
				mutations.forEach(m => {
					this.$nextTick(() => {
						shell.scrollTo(0, shell.scrollHeight);
					})
				})
			});
			promptObs.observe(prompt, {
				childList: true,
			});
		}
	}
</script>

<style lang="scss" scoped>
</style>
