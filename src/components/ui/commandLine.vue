<template>
	<div>
		<input id="ghost-input"
		       :value="$store.state.command.commandBuffer"
		       v-stream:keydown="typeCommand$" autofocus ref="input"/>
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
			<div v-for="en in $store.state.command.resultBuffer">
				<span>{{en}}</span>
			</div>
			<fake-caret v-if="$store.state.command.resolving"/>
		</div>
	</div>
</template>

<script>
	import {pluck, tap, filter, switchMap, share} from 'rxjs/operators'
	import {resolveCommand} from "@/resolver/shell";
	import FakeCaret from "@/components/ui/fakeCaret";

	export default {
		name: "commandLine",
		components: {FakeCaret},
		domStreams: ['typeCommand$'],
		subscriptions() {
			const $input = this.typeCommand$.pipe(
				filter(() => {
					return !this.$store.state.command.resolving;
				}),
				tap(() => setTimeout(() => {
					this.$store.state.command.commandBuffer = this.$refs.input.value;
					this.$store.commit('updateCaret', this.$refs.input.selectionStart);
				}, 0)),
				share(),
			);
			const $enter = $input.pipe(
				pluck('event', 'which'),
				filter(w => w === 13),
				tap(() => this.$store.dispatch('startResolve')),
				tap(() => this.$store.dispatch('storeCurrent')),
				tap(() => {
					resolveCommand(this.$store.state.command.commandBuffer).subscribe({
						next: v => {
							this.$store.state.command.resultBuffer.push(v);
						},
						error: () => null,
						complete: () => {
							this.$store.dispatch('endResolve').then(() => {
								this.$store.dispatch('pushHistory').then(() => {
									this.$nextTick(() => {
										const shell = document.querySelector('.shell');
										shell.scrollTo(0, shell.scrollHeight);
									})
								});
							});
						}
					})
				}),
			);
			const $pre = $input.pipe(
				pluck('event', 'which'),
				filter(w => w === 38),
				tap(() => {
					this.$store.dispatch('updateCommandOffset', -1);
				})
			);
			const $next = $input.pipe(
				pluck('event', 'which'),
				filter(w => w === 40),
				tap(() => {
					this.$store.dispatch('updateCommandOffset', 1);
				})
			);
			return {
				$enter,
				$pre,
				$next,
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
