<script setup lang="ts">
const theme = useTheme();

defineProps<{
	error: Error;
}>();

useHead({
	bodyAttrs: {
		class: theme.value.isLight ? "light" : "dark"
	}
});
</script>

<template>
	<NavBar />
	<div class="container">
		<div>It seems like this page was lost in the sands...</div>
		<NuxtLink to="/" :class="theme.background + ' cursorPointer'">Go back home</NuxtLink>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	font-size: var(--font-size--heading);
	text-align: center;
}

a,
a:visited {
	color: var(--color-text);
	text-decoration: none;
	padding: 5px 20px;
}
</style>
