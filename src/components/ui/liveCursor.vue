<template>
	<span class="cursor"></span>
</template>

<script>
	export default {
		name: "liveCursor"
	}
</script>

<style scoped>
	.cursor {
		display: inline-block;
		width: 0.5rem;
		height: 1.125rem;
		background: white;
		animation: shine 1.5s linear infinite;
	}

	@keyframes shine {
		0%{
			background: transparent;
		}
		50%{
			background: transparent;
		}
		51%{
			background: white;
		}
		100%{
			background: white;
		}
	}
</style>
