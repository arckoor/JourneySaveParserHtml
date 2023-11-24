<script setup lang="ts">
const lightBackground = useLightBackground();
const steamLink = useSteamLink();

defineProps<{
	playerLink: string
	playerSymbol: number
	playerName: string
}>();
</script>

<template>
	<a
		:class="lightBackground"
		:href="steamLink ? 'steam://openurl/' + playerLink : playerLink"
		target="_blank"
		@dragstart.prevent
	>
		<div class="glyphDisplay">
			{{ String.fromCharCode(playerSymbol) }}
		</div>
		<div class="playerDisplay enableSelection">
			{{ playerName }}
		</div>
	</a>
</template>

<style scoped>
a {
	color: var(--color-text);
	display: flex;
	align-items: center;
	margin-right: 40px;
	margin-bottom: 15px;
	text-decoration: unset;
	width: fit-content;
}

.playerDisplay {
	display: inline-block;
	margin: 10px;
}
</style>
