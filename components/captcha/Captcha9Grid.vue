<template>
	<div class="image-container" v-if="ready">
		<div class="grid-overlay">
			<div
				v-for="(selected, index) in grid"
				:key="index"
				:class="{ selected }"
				:style="{
					backgroundImage: `url(${images[index].default})`,
					backgroundSize: '100% 100%',
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
			grid: Array(9).fill(false),
			task: null as string | null,
			images: Array(),
			selectCount: 0,
		};
	},
	async mounted() {
		const mappings: Array<[string, Array<typeof import("*.jpg")>]> = [
			["arches", [await import("images/april-fools/20240614235742_1.jpg"), await import("images/april-fools/20250330174657_1.jpg"), await import("images/april-fools/20250330182427_1.jpg"), await import("images/april-fools/20250330182435_1.jpg"), await import("images/april-fools/20250330182717_1.jpg"), await import("images/april-fools/20250330182745_1.jpg"), await import("images/april-fools/20250330182756_1.jpg"), ]],
			["wayfarers", [await import("images/april-fools/20240614235742_1.jpg"), await import("images/april-fools/20240615000302_2.jpg"), await import("images/april-fools/20240615001257_1.jpg"), await import("images/april-fools/20240818210500_1.jpg"), await import("images/april-fools/20241023230059_1.jpg"), await import("images/april-fools/20241023232333_1.jpg"), await import("images/april-fools/20241108232638_1.jpg"), await import("images/april-fools/20241109004052_1.jpg"), await import("images/april-fools/20241109004707_1.jpg"), await import("images/april-fools/20241109010139_1.jpg"), await import("images/april-fools/20241214223144_1.jpg"), await import("images/april-fools/20250330173932_1.jpg"), await import("images/april-fools/20250330174155_1.jpg"), await import("images/april-fools/20250330181301_1.jpg"), await import("images/april-fools/20250330181457_1.jpg"), await import("images/april-fools/20250330181905_1.jpg"), await import("images/april-fools/20250330183348_1.jpg"), await import("images/april-fools/20250330183440_1.jpg"), await import("images/april-fools/20250330184653_1.jpg"), await import("images/april-fools/20250330190701_1.jpg"), await import("images/april-fools/20250330191503_1.jpg"), ]],
			["faceplants", [await import("images/april-fools/20241109004052_1.jpg"), await import("images/april-fools/20250330175019_1.jpg"), await import("images/april-fools/20250330175543_1.jpg"), await import("images/april-fools/20250330181457_1.jpg"), await import("images/april-fools/20250330182046_1.jpg"), await import("images/april-fools/20250330183102_1.jpg"), await import("images/april-fools/20250330183839_1.jpg"), await import("images/april-fools/20250330184429_1.jpg"), await import("images/april-fools/20250330190019_1.jpg"), await import("images/april-fools/20250330191923_1.jpg"), ]],
			["mountains", [await import("images/april-fools/20241023232333_1.jpg"), await import("images/april-fools/20250330175218_1.jpg"), await import("images/april-fools/20250330182659_1.jpg"), await import("images/april-fools/20250330182913_1.jpg"), await import("images/april-fools/20250330185034_1.jpg"), await import("images/april-fools/20250330185745_1.jpg"), ]],
			["war machines", [await import("images/april-fools/20240615001257_1.jpg"), await import("images/april-fools/20241108232638_1.jpg"), await import("images/april-fools/20250330174155_1.jpg"), await import("images/april-fools/20250330174423_1.jpg"), await import("images/april-fools/20250330174904_1.jpg"), await import("images/april-fools/20250330183704_1.jpg"), await import("images/april-fools/20250330184002_1.jpg"), await import("images/april-fools/20250330185106_1.jpg"), await import("images/april-fools/20250330185211_1.jpg"), await import("images/april-fools/20250330192048_1.jpg"), await import("images/april-fools/20250330192153_1.jpg"), await import("images/april-fools/20250330194303_1.jpg"), await import("images/april-fools/20250330194340_1.jpg"), ]],
			["carpets", [await import("images/april-fools/20240614235742_1.jpg"), await import("images/april-fools/20241023230059_1.jpg"), await import("images/april-fools/20250330174904_1.jpg"), await import("images/april-fools/20250330175019_1.jpg"), await import("images/april-fools/20250330175317_1.jpg"), await import("images/april-fools/20250330175543_1.jpg"), await import("images/april-fools/20250330182717_1.jpg"), await import("images/april-fools/20250330183000_1.jpg"), await import("images/april-fools/20250330185106_1.jpg"), await import("images/april-fools/20250330185206_1.jpg"), await import("images/april-fools/20250330190208_1.jpg"), ]],
			["fliers", [await import("images/april-fools/20240818210500_1.jpg"), await import("images/april-fools/20250330174419_1.jpg"), await import("images/april-fools/20250330175105_1.jpg"), await import("images/april-fools/20250330182620_1.jpg"), await import("images/april-fools/20250330183406_1.jpg"), await import("images/april-fools/20250330183839_1.jpg"), await import("images/april-fools/20250330183855_1.jpg"), await import("images/april-fools/20250330184507_1.jpg"), await import("images/april-fools/20250330185324_1.jpg"), await import("images/april-fools/20250330190208_1.jpg"), ]],
			["shrines", [await import("images/april-fools/20241214223144_1.jpg"), await import("images/april-fools/20250330173858_1.jpg"), await import("images/april-fools/20250330174642_1.jpg"), await import("images/april-fools/20250330175411_1.jpg"), await import("images/april-fools/20250330181543_1.jpg"), await import("images/april-fools/20250330183230_1.jpg"), await import("images/april-fools/20250330184952_1.jpg"), ]],
			["cloth", [await import("images/april-fools/20240818210500_1.jpg"), await import("images/april-fools/20250330173914_1.jpg"), await import("images/april-fools/20250330183517_1.jpg"), await import("images/april-fools/20250330184117_1.jpg"), await import("images/april-fools/20250330185351_1.jpg"), await import("images/april-fools/20250330185614_1.jpg"), await import("images/april-fools/20250330190208_1.jpg"), await import("images/april-fools/20250330190316_1.jpg"), ]],
			["symbols", [await import("images/april-fools/20241108232638_1.jpg"), await import("images/april-fools/20250330184138_1.jpg"), await import("images/april-fools/20250330184811_1.jpg"), await import("images/april-fools/20250330190557_1.jpg"), await import("images/locations/BB/S0.webp"), await import("images/locations/BB/S2.webp"), await import("images/locations/CS/S0.webp"), await import("images/locations/SC/S2.webp"), await import("images/locations/TO/S3.webp"), await import("images/locations/BB/S2.webp"), ]],
			["whales", [await import("images/april-fools/20250330190150_1.jpg"), await import("images/april-fools/20250330190208_1.jpg"), await import("images/april-fools/20250330190426_1.jpg"), await import("images/april-fools/20250330190513_1.jpg"), await import("images/april-fools/20250330190518_1.jpg"), await import("images/april-fools/20250330192457_1.jpg"), await import("images/april-fools/20250330193113_1.jpg"), ]],
			["buildings", [await import("images/april-fools/20250330173914_1.jpg"), await import("images/april-fools/20250330174925_1.jpg"), await import("images/april-fools/20250330174947_1.jpg"), await import("images/april-fools/20250330175141_1.jpg"), await import("images/april-fools/20250330183348_1.jpg"), await import("images/april-fools/20250330185034_1.jpg"), await import("images/april-fools/20250330174314_1.jpg"), await import("images/april-fools/20250330174419_1.jpg"), await import("images/april-fools/20250330175317_1.jpg"), ]],
			["murals", [await import("images/locations/CS/M0.webp"), await import("images/locations/BB/M0.webp"), await import("images/locations/PD/M0.webp"), await import("images/locations/PD/M1.webp"), await import("images/locations/SC/M0.webp"), await import("images/locations/SC/M1.webp"), await import("images/locations/SN/M0.webp"), await import("images/locations/SN/M1.webp"), await import("images/locations/TO/M0.webp"), await import("images/locations/UG/M0.webp"), ]]
		];

		let tasks: Array<string> = [];
		let images: Array<typeof import("*.jpg")> = [];
		const selectedMappings = shuffle([...mappings]).slice(0, 3);
		
		selectedMappings.forEach(([task, imgs]: [string, Array<typeof import("*.jpg")>]) => {
			tasks.push(task);
			const randomImages = shuffle([...imgs]).slice(0, 3);
			images.push(...randomImages);
		});

		const task = tasks[Math.floor(Math.random() * tasks.length)];
		this.task = task;
		this.images = shuffle(images);
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
	}
});
</script>

<style scoped>
.image-container {
    position: relative;
    width: 55vh;
    height: 55vh;
    display: inline-block;
}

.grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
}

.grid-overlay div {
	border: 1px solid rgba(255, 255, 255, 1);
	transition: all 0.1s ease-in-out;
	background-repeat: no-repeat;
}

.grid-overlay div.selected {
	transform: scale(0.85);
}

</style>