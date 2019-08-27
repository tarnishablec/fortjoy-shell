<template>
	<div class="guide">
		<slogan/>
		<span id="blog">View the blog in the <router-link to="/blog">blog</router-link> folder.</span>
		<span>- <a href="mailto:tarnishablec@outlook.com" class="mail">Yihan &lttarnishablec@outlook.com&gt</a></span>
		<span>Type <u>`help`</u> for a list of commands.</span>
	</div>
</template>

<script>
	import Slogan from "./slogan";

	export default {
		name: "guide",
		components: {Slogan}
	}
</script>

<style lang="scss" scoped>
	.guide {
		color: #b7ffe2;
		display: flex;
		flex-direction: column;
		margin: 0.5rem auto;
		column-gap: 20px;
		text-underline-position: under;

		& > * {
			line-height: 2rem;
		}

		span {
			u {
				text-decoration: none;
				color: orange;
			}
		}
	}

	#blog {
		a{
			color: currentColor;
		}
	}

	a.mail {
		all: unset;
		cursor: pointer;
		border-bottom: 1px solid currentColor;
		color: violet;
	}
</style>
