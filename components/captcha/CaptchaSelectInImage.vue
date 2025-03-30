<script lang="ts" setup>
defineProps<{
	gridSize: number,
}>();
</script>

<template>
	<div class="image-container" v-if="ready">
		<div class="grid-overlay" :style="{gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)`}">
			<div
				v-for="(selected, index) in grid"
				:key="index"
				:class="{ selected }"
				:style="{
					// @ts-expect-error
					backgroundImage: `url(${bgImage.default})`,
					backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
					backgroundPosition: getBackgroundPosition(index),
					cursor: 'pointer',
				}"
				@click="toggleSelection(index)"
			/>
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	emits: ["taskAssign", "taskReady"],
	data() {
		return {
			ready: false,
			grid: Array(this.gridSize * this.gridSize).fill(false),
			task: null as string | null,
			bgImage: null as typeof import("*.jpg") | null,
			selectCount: 0,
		};
	},
	async mounted() {
		const mappings: Array<[string, typeof import("*.jpg")]> = [
			["bridges", await import("images/april-fools/20250330174223_1.jpg")],
			["bridges", await import("images/april-fools/20250330174314_1.jpg")],
			["war machines", await import("images/april-fools/20250330174806_1.jpg")],
			["war machines", await import("images/april-fools/20250330183704_1.jpg")],
			["war machines", await import("images/april-fools/20250330183717_1.jpg")],
			["sand", await import("images/april-fools/20250330181905_1.jpg")],
			["carpets", await import("images/april-fools/20250330182404_1.jpg")],
			["scarf", await import("images/april-fools/20250330182943_1.jpg")],
			["symbols", await import("images/april-fools/20250330184138_1.jpg")],
			["symbols", await import("images/april-fools/20250330184811_1.jpg")],
			["cloth", await import("images/april-fools/20250330185614_1.jpg")],
			["cloth", await import("images/april-fools/20250330190316_1.jpg")],
			["jellyfish", await import("images/april-fools/20250330190426_1.jpg")],
			["wayfarers", await import("images/april-fools/20250330191503_1.jpg")],
		];
		const [task, bgImage] = mappings[Math.floor(Math.random() * mappings.length)];
		this.task = task;
		this.bgImage = bgImage;
		this.$emit("taskAssign", this.task);
		this.ready = true;
	},
	methods: {
		toggleSelection(index: number) {
			this.grid[index] = !this.grid[index];
			const selectCount = this.selectCount;
			if (this.grid[index]) {
				this.selectCount++;
			} else {
				this.selectCount--;
			}
			if (this.selectCount > 0 && selectCount === 0) {
				this.$emit("taskReady", true);
			} else if (selectCount > 0 && this.selectCount === 0) {
				this.$emit("taskReady", false);
			}
		},
		getBackgroundPosition(index: number) {
			const col = index % this.gridSize;
			const row = Math.floor(index / this.gridSize);
			return `${(col / (this.gridSize - 1)) * 100}% ${(row / (this.gridSize - 1)) * 100}%`;
		},
	}
});
</script>

<style scoped>
.image-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: inline-block;
}

.grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
}

.grid-overlay div {
	border: 1px solid rgba(255, 255, 255, 1);
	transition: all 0.1s ease-in-out;
	background-repeat: no-repeat;
}

.grid-overlay div.selected {
	transform: scale(0.75);
}

</style>