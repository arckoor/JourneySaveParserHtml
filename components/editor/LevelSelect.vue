<template>
	<div>{{ levelIndex+1 + " - " + levelNames[levelIndex+1] }}</div>
	<EditorLayout @left-arrow="changeLevel(0)" @right-arrow="changeLevel(1)">
		<template #innerEditorContent>
			<SourcedImage
				v-if="ready"
				class="img"
				:src="`${levelIndex+1}`"
				alt="The currently selected Level"
				@dragstart.prevent
			/>
		</template>
	</EditorLayout>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			saves: useSaves(),
			levelIndex: 0,
			ready: false
		};
	},
	mounted() {
		this.$watch(this.saves.get, () => this.updateLevel(), { deep: true });
		this.updateLevel();
	},
	methods: {
		changeLevel(mode: number) {
			let levelData = readData(this.saves, "u8", offsets.levelValue) as number;
			levelData = mode === 0 ? --levelData : ++levelData;
			levelData = wrap(1, 11, levelData);
			writeData(this.saves, "u8", offsets.levelValue, levelData);
			this.updateLevel();
		},
		updateLevel() {
			this.levelIndex = readData(this.saves, "u8", offsets.levelValue) as number - 1;
			this.ready = true;
		}
	}
});
</script>

<style scoped>
div {
	display: flex;
	justify-content: center;
	margin-bottom: 40px;
}

picture {
	width: 40%;
	min-width: 400px;
}

:deep(picture > img) {
	width: calc(100% - 8px);
	border: 4px dashed #ffffff;
}
</style>
