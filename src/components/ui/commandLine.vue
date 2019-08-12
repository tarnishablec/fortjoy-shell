<template>
	<div>
		<input id="ghost-input"
		       :value="$store.state.command.commandBuffer"
		       @input="updateInput" v-stream:keydown="typeCommand$" autofocus ref="input"/>
		<section class="command command-input">
			<span class="command-role">{{$store.state.permission.role.description}}</span>
			<span>@fortjoy.sh:</span>
			<span>{{$route.fullPath}}</span>
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
	import {pluck, tap, filter, switchMap, share, toArray} from 'rxjs/operators'
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
					this.$store.commit('updateCaret', this.$refs.input.selectionStart);
				}, 0)),
				share(),
			);
			this.$enter = $input.pipe(
				pluck('event', 'which'),
				filter(w => w === 13),
				tap(() => this.$store.dispatch('startResolve')),
				tap(() => {
					this.$resolve = resolveCommand(this.$store.state.command.commandBuffer);
					this.$resolve.subscribe({
						next: v => this.$store.state.command.resultBuffer.push(v),
						error: () => null,
						complete: () => {
							setTimeout(() => {
								this.$store.dispatch('endResolve').then(() => {
									this.$store.dispatch('commitCommand');
								});
							}, 0)
						}
					})
				}),
				switchMap(() => this.$resolve),
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
				$enter: this.$enter,
				$pre,
				$next,
			}
		},
		methods: {
			updateInput(e) {
				this.$store.state.command.commandBuffer = e.target.value;
				this.$store.state.command.selectionStart = e.target.selectionStart;
			},
			// enterCommand(e) {
			// 	if (this.$store.state.command.resolving) {
			// 		return;
			// 	}
			// 	const input = this.$refs.input;
			// 	setTimeout(() => {
			// 		this.$store.commit('updateCaret', input.selectionStart);
			// 	}, 0);
			// 	const shell = this.$refs.shell;
			// 	// console.log(e.which);
			// 	if (e.which === 13) {
			// 		this.$store.dispatch('commitCommand').then(() => {
			// 			this.$nextTick(() => {
			// 				shell.scrollTo(0, shell.scrollHeight);
			// 			})
			// 		})
			// 	}
			// 	if (e.which === 38) {
			// 		this.$store.dispatch('updateCommandOffset', -1);
			// 	}
			// 	if (e.which === 40) {
			// 		this.$store.dispatch('updateCommandOffset', 1);
			// 	}
			// },
		},
	}
</script>

<style lang="scss" scoped>
</style>
